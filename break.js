/**
* @param {NS} ns
**/
export async function main (ns) {
	ns.tprint ("> Mapping all available servers...")
	var host = ns.getHostname();
	var scanArray = [host];
	var currentScanLength = 0;
	var servers = [];
	var server, i, j, files;
	var previousScanLength, currentScanLength, currentHost, newScan;

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
	ns.tprint ("> Server matrix finished! Firing Doomsday script...");
	var index = 0;
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
		if (server.hasAdminRights) {
			files = ["hack.js", "grow.js", "weaken.js"];
			await ns.scp (files, "home", server.hostname);
			index++;
		}
	}
	ns.tprint ("Successfully broke " + index + " server defenses below your hacking level!");

}
