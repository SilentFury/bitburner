/**
* @param {NS} ns
**/
export async function main (ns) {

  var hostname = ns.getHostname()
  var scanArray = [hostname]
  var currentScanLength = 0
  var index1 = 0, index2 = 0, scripts = 0
  var servers = []
  var server, i, j
  var previousScanLength, currentScanLength, currentHost, newScan

  if (ns.fileExists ("BruteSSH.exe", "home")) scripts++
  if (ns.fileExists ("FTPCrack.exe", "home")) scripts++
  if (ns.fileExists ("HTTPWorm.exe", "home")) scripts++
  if (ns.fileExists ("relaySMTP.exe", "home")) scripts++
  if (ns.fileExists ("SQLInject.exe", "home")) scripts++

  if (ns.args.length == 0) {
    ns.tprint ("Mapping all available servers...")
    while (currentScanLength < scanArray.length) {
      previousScanLength = currentScanLength
      currentScanLength = scanArray.length
      for (i = previousScanLength; i < currentScanLength; i++) {
        currentHost = scanArray[i]
        server = ns.getServer(currentHost)
        servers.push(server)
        newScan = ns.scan(currentHost)
        for (j = 0; j < newScan.length; j++) {
          if (scanArray.indexOf(newScan[j]) == -1) {
            scanArray.push(newScan[j])
          }
        }
      }
    }
    await ns.sleep (1000)
    ns.tprint ("Server matrix finished! Firing Doomsday script...")
  } else {
    hostname = ns.args[0]
    if (!ns.serverExists (hostname)) {
      ns.toast ("Error: [" + hostname + "] server does not exist.", "error", 5000)
      ns.exit ()
    }
    server = ns.getServer(hostname)
    servers.push(server)
    if (server.purchasedByPlayer || server.hostname == "home") {
      ns.toast ("Error: [" + hostname + "] is our own server!", "error", 5000)
      ns.exit()
    }
    if (server.hasAdminRights) {
      ns.toast ("Error: We already have root access to [" + hostname + "].", "error", 5000)
      ns.exit()
    }
    ns.tprint ("Attemting to break into " + server.hostname + "...")
  }

  for (i = 0; i < servers.length; i++) {
    server = servers[i]
    if (server.requiredHackingSkill > ns.getHackingLevel()) continue
    if (server.purchasedByPlayer || server.hostname == "home") continue
    if (ns.getServerNumPortsRequired(server.hostname)>scripts) continue
    if (!server.hasAdminRights) {
      if (ns.fileExists ("BruteSSH.exe", "home")) {
        ns.brutessh (server.hostname)
      }
      if (ns.fileExists ("FTPCrack.exe", "home")) {
        ns.ftpcrack (server.hostname)
      }
      if (ns.fileExists ("HTTPWorm.exe", "home")) {
        ns.httpworm (server.hostname)
      }
      if (ns.fileExists ("relaySMTP.exe", "home")) {
        ns.relaysmtp (server.hostname)
      }
      if (ns.fileExists ("SQLInject.exe", "home")) {
        ns.sqlinject (server.hostname)
      }
      await ns.sleep(25);
      if (ns.getServerNumPortsRequired(server.hostname)<=server.openPortCount) {
        ns.nuke (server.hostname)
        await ns.sleep(25);
        ns.tprint ("Gained access to " + server.hostname)
        index1++
      }
    }
    index2++
  }
  await ns.sleep (1000)
  if (ns.args.length == 0) {
    ns.run ("botUpload.js", 1)
    ns.tprint ("Successfully broke into " + index1 + " new servers! Total: " + index2)
  } else {
    server = servers[0]
    if (index1 == 1) {
      ns.run ("botUpload.js", 1, server.hostname)
    } else if (index1 == 0) {
      ns.tprint ("Error: Could not break into " + server.hostname + ".")
      ns.toast ("Error: Could not break into " + server.hostname + ".", "error", 5000)
      if (server.requiredHackingSkill > ns.getHackingLevel()) {
        ns.tprint ("> Hacking skill: " + ns.getHackingLevel() + " / Required: " + server.requiredHackingSkill)
      }
      if (ns.getServerNumPortsRequired(server.hostname)>scripts) {
        ns.tprint ("> Open ports: " + server.openPortCount + " / Required: " + ns.getServerNumPortsRequired(server.hostname))
      }
    } else {
      ns.tprint ("Error: Index returned " + index1 + ".")
    }
  }
}
