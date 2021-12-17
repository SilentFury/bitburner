/**
* @param {NS} ns
**/
export async function main (ns) {
	var host = ns.getHostname();
	var scanArray = [host];
	var target = ns.args[0];
	var currentScanLength = 0;
	var previousScanLength, currentScanLength, currentHost, newScan;
	var server, i, j;
	
	while (currentScanLength < scanArray.length) {
   		previousScanLength = currentScanLength;
    	currentScanLength = scanArray.length;
    	for (i = previousScanLength; i < currentScanLength; i++) {
     		currentHost = scanArray[i];
      		server = ns.getServer(currentHost)
			if (server.hasAdminRights && server.hostname != "home") {
				/* Botnet executable commands */
				ns.exec ("optimize.js", server.hostname, 1, "hack", target);
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
	ns.tprint ("> Doomsday attack launched against [" + target + "]!");
}
