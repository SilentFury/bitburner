/**
* @param {NS} ns
**/
export async function main (ns) {
	var host = ns.getHostname();
	var scanArray = [host];
	var currentScanLength = 0, index = 0;
	var servers = [];
	var previousScanLength, currentScanLength, currentHost, newScan;
	var server, i, j, scriptRAM, serverRAM, threads;
	
	while (currentScanLength < scanArray.length) {
   		previousScanLength = currentScanLength;
    	currentScanLength = scanArray.length;
    	for (i = previousScanLength; i < currentScanLength; i++) {
     		currentHost = scanArray[i];
      		server = ns.getServer(currentHost)
      		servers.push(server);
        	newScan = ns.scan(currentHost);
        	for (j = 0; j < newScan.length; j++) {
            	if (scanArray.indexOf(newScan[j]) == -1) {
                	scanArray.push(newScan[j]);
            	}
        	}
   		}
	}

	for (i = 0; i < servers.length; i++) {
		server = servers[i];
		if (server.requiredHackingSkill > ns.getHackingLevel()) continue;
		if (server.purchasedByPlayer || server.hostname == "home") continue;
		if (ns.fileExists ("BruteSSH.exe", "home")) {
			ns.brutessh (server.hostname);
		}
		if (ns.fileExists ("FTPCrack.exe", "home")) {
			ns.ftpcrack (server.hostname);
		}
		if (ns.fileExists ("HTTPWorm.exe", "home")) {
			ns.httpworm (server.hostname);
		}
		if (ns.fileExists ("relaySMTP.exe", "home")) {
			ns.relaysmtp (server.hostname);
		}
		if (ns.fileExists ("SQLInject.exe", "home")) {
			ns.sqlinject (server.hostname);
		}
		if (ns.getServerNumPortsRequired(server.hostname)<=server.openPortCount) {
			ns.nuke (server.hostname);
		}
		if (server.hasAdminRights) index++;
	}
	ns.tprint ("Successfully broke " + index + " server defenses below your hacking level!");
}
