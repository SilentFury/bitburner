/**
* @param {NS} ns
**/
export async function main (ns) {
	var host = ns.getHostname();
	var scanArray = [host];
	var currentScanLength = 0, index = 0;
	var previousScanLength, currentScanLength, currentHost, newScan;
	var server, i, j;
	
	while (currentScanLength < scanArray.length) {
   		previousScanLength = currentScanLength;
    	currentScanLength = scanArray.length;
    	for (i = previousScanLength; i < currentScanLength; i++) {
     		currentHost = scanArray[i];
      		server = ns.getServer(currentHost)
			if (server.hasAdminRights) {
				if (server.hostname == "home") continue;
				/* Botnet upload commands */
				await ns.scp ("hack.js", server.hostname);
				await ns.scp ("weaken.js", server.hostname);
				await ns.scp ("grow.js", server.hostname);
				/* Botnet upload commands */
				index++;
			}
        	newScan = ns.scan(currentHost);
        	for (j = 0; j < newScan.length; j++) {
            	if (scanArray.indexOf(newScan[j]) == -1) {
                	scanArray.push(newScan[j]);
            	}
        	}
   		}
	}
	ns.tprint ("> Script uploaded to " + index + " servers!");
}
