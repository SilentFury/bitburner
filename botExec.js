/**
* @param {NS} ns
**/
export async function main (ns) {
	var host = ns.getHostname();
	var scanArray = [host];
	var currentScanLength = 0;
	var previousScanLength, currentScanLength, currentHost, newScan;
	var server, i, j, target, scriptRAM, serverRAM, threads;
	
	while (currentScanLength < scanArray.length) {
   		previousScanLength = currentScanLength;
    	currentScanLength = scanArray.length;
    	for (i = previousScanLength; i < currentScanLength; i++) {
     		currentHost = scanArray[i];
      		server = ns.getServer(currentHost)
			if (server.hasAdminRights) {
				/* Botnet executable commands */
				target = "iron-gym";
				if (server.hostname == target || server.hostname == "home") continue;
				scriptRAM = ns.getScriptRam("grow.js", server.hostname);
				serverRAM = server.maxRam;
				threads = Math.floor (serverRAM/scriptRAM/2);	// We will run both weaken and grow
				ns.exec ("grow.js", server.hostname, threads, target);
				ns.exec ("weaken.js", server.hostname, threads, target);
				/* Botnet executable commands */
			}
        	newScan = ns.scan(currentHost);
        	for (j = 0; j < newScan.length; j++) {
            	if (scanArray.indexOf(newScan[j]) == -1) {
                	scanArray.push(newScan[j]);
            	}
        	}
   		}
	}
	ns.tprint ("> Command successfully transmitted!");
}
