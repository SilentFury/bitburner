/**
* @param {NS} ns
**/
export async function main (ns) {
	ns.tprint ("> Mapping all available servers...")
	var host = ns.getHostname();
	var scanArray = [host];
	var currentScanLength = 0;
	var index1 = 0, index2 = 0;
	var servers = [];
	var server, i, j;
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
	await ns.sleep (1000);
	ns.tprint ("> Server matrix finished! Firing Doomsday script...");
	for (i = 0; i < servers.length; i++) {
		server = servers[i];
		if (server.requiredHackingSkill > ns.getHackingLevel()) continue;
		if (server.purchasedByPlayer || server.hostname == "home") continue;
		if (!server.hasAdminRights) {
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
      await ns.sleep(50);
			if (ns.getServerNumPortsRequired(server.hostname)<=server.openPortCount) {
				ns.nuke (server.hostname);
			}
      ns.tprint ("Gained access to " + server.hostname);
      index1++;
		}
		index2++;
	}
	await ns.sleep (1000);
	ns.run ("botUpload.js");
	ns.tprint ("Successfully broke into " + index1 + " new servers! Total: " + index2);
}
