// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::File;
use std::io::{BufReader, BufRead, Error};
use std::process::Command;
use std::collections::HashMap;
use regex::Regex;
use local_ip_address::local_ip;

fn get_hosts() -> Result<Vec<HashMap<String, String>>, Error> {
  let path = r"C:\Windows\System32\drivers\etc\hosts";
  let input = File::open(path)?;
  let buffered = BufReader::new(input);
  let mut maps = Vec::new();
  for item in buffered.lines().skip(20) {
    let line = item?.split_whitespace().map(String::from).collect::<Vec<String>>();
    let mut map = HashMap::new();
    if line.len() == 2 {
      map.insert(String::from("active"), String::from("true"));
      map.insert(String::from("hostip"), line[0].clone().to_string());
      map.insert(String::from("host"), line[1].clone().to_string());
    } else {
      map.insert(String::from("active"), String::from("false"));
      map.insert(String::from("hostip"), line[1].clone().to_string());
      map.insert(String::from("host"), line[2].clone().to_string());
    }
    maps.push(map);
  }
  Ok(maps)
}

fn get_nets(re_str: &str)-> Result<Vec<HashMap<String, String>>, Error>{
  let output = Command::new("cmd")
    .args(&["/C", "netsh interface portproxy show all"])
    .output()?;
  let re = Regex::new(&re_str).unwrap();
  let mut match_vec = Vec::new();
  for line in String::from_utf8_lossy(&output.stdout).lines() {
    if re.is_match(line) {
      match_vec.push(line.to_string());
    }
  }
  let mut maps = Vec::new();
  for line in match_vec {
    let net = line.split_whitespace().map(String::from).collect::<Vec<String>>();
    let mut map = HashMap::new();
    map.insert(String::from("hostip"), if net.len() >= 4{net[0].clone().to_string()}else{String::from("")});
    map.insert(String::from("hostport"), if net.len() >= 4{net[1].clone().to_string()}else{String::from("")});
    map.insert(String::from("rootingip"), if net.len() >= 4{net[2].clone().to_string()}else{String::from("")});
    map.insert(String::from("rootingport"), if net.len() >= 4{net[3].clone().to_string()}else{String::from("")});
    maps.push(map);
  }
  Ok(maps)
}


// fn get_netsh(ip: &str, port: &str)-> Result<HashMap<String, String>, Error>{
//   let output = Command::new("cmd")
//     .args(&["/C", "netsh interface portproxy show all"])
//     .output()?;
//   let re_str = format!(r"{} [ ]*{} [ ]*", ip, port);
//   let re = Regex::new(&re_str).unwrap();
//   let mut match_str = String::from("");
//   for line in String::from_utf8_lossy(&output.stdout).lines() {
//     if re.is_match(line) {
//       match_str = line.to_string();
//       break;
//     }
//   }
//   let net = match_str.split_whitespace().map(String::from).collect::<Vec<String>>();
//   let mut map = HashMap::new();
//   map.insert(String::from("hostip"), if net.len() >= 4{net[0].clone().to_string()}else{String::from("")});
//   map.insert(String::from("hostport"), if net.len() >= 4{net[1].clone().to_string()}else{String::from("")});
//   map.insert(String::from("rootingip"), if net.len() >= 4{net[2].clone().to_string()}else{String::from("")});
//   map.insert(String::from("rootingport"), if net.len() >= 4{net[3].clone().to_string()}else{String::from("")});
//   Ok(map)
// }

#[tauri::command]
fn get_ipmap()-> Vec<HashMap<String, String>> {
  let mut maps = Vec::new();
  let hosts = get_hosts().unwrap();
  let nets = get_nets(r"[0-9]*\.[0-9]*\.[0-9]*\.[0-9]*").unwrap();
  for net in nets {
    let mut flag = false;
    for host in &hosts {
      if net.get("hostip").unwrap() == host.get("hostip").unwrap()
      && net.get("hostport").unwrap() == &String::from("80") {
        let mut map = HashMap::new();
        map.insert(String::from("mode"), String::from("localhost"));
        map.insert(String::from("active"), host.get("active").unwrap().to_string());
        map.insert(String::from("host"), host.get("host").unwrap().to_string());
        map.insert(String::from("hostip"), net.get("hostip").unwrap().to_string());
        map.insert(String::from("hostport"), net.get("hostport").unwrap().to_string());
        map.insert(String::from("rootingip"), net.get("rootingip").unwrap().to_string());
        map.insert(String::from("rootingport"), net.get("rootingport").unwrap().to_string());
        maps.push(map);
        flag = true;
      }
    }
    if flag == false {
      let mut map = HashMap::new();
      map.insert(String::from("mode"), String::from("transport"));
      map.insert(String::from("active"), String::from("active"));
      map.insert(String::from("host"), String::from("-"));
      map.insert(String::from("hostip"), net.get("hostip").unwrap().to_string());
      map.insert(String::from("hostport"), net.get("hostport").unwrap().to_string());
      map.insert(String::from("rootingip"), net.get("rootingip").unwrap().to_string());
      map.insert(String::from("rootingport"), net.get("rootingport").unwrap().to_string());
      maps.push(map);
    }
  }
  // for line in hosts {
  //   let mut map = HashMap::new();
  //   let active = line.get("active").unwrap();
  //   map.insert(String::from("active"), active.to_string());
  //   let host = line.get("host").unwrap();
  //   map.insert(String::from("host"), host.to_string());
  //   let hostip = line.get("ip").unwrap();
  //   let net = get_netsh(hostip, "80").unwrap();
  //   map.insert(String::from("hostip"), hostip.to_string());
  //   let hostport = net.get("hostport").unwrap();
  //   map.insert(String::from("hostport"), hostport.to_string());
  //   let rootingip = net.get("rootingip").unwrap();
  //   map.insert(String::from("rootingip"), rootingip.to_string());
  //   let rootingport = net.get("rootingport").unwrap();
  //   map.insert(String::from("rootingport"), rootingport.to_string());
  //   maps.push(map);
  // }
  // let my_local_ip = local_ip().unwrap().to_string();
  // let net = get_netsh(&my_local_ip, "80").unwrap();
  // println!("{:?}", net);
  return maps
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_ipmap])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
