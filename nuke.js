/**
* @param {NS} ns
**/
export async function main (ns) {
	var host = ns.getHostname();
	var scanArray = [host];
	var currentScanLength = 0;
	var previousScanLength, currentScanLength, currentHost, newScan;
	var server, i, j, massmurder;

	var target = ns.args[0];
	if (target == "") {
		massmurder = await ns.prompt ("No target argument used, are you sure you want to fire a generic nuke attack?");
		if (!massmurder) {
			ns.tprint ("Attack aborted by user input.");
			ns.exit ();
		}
	}
	
	while (currentScanLength < scanArray.length) {
   		previousScanLength = currentScanLength;
    	currentScanLength = scanArray.length;
    	for (i = previousScanLength; i < currentScanLength; i++) {
     		currentHost = scanArray[i];
      		server = ns.getServer(currentHost)
			if (server.hasAdminRights && server.hostname != "home" && !server.purchasedByPlayer) {
				/* Botnet executable commands */
				if (massmurder) target = server.hostname;
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
	if (massmurder) {
		ns.tprint ("> Doomsday attack launched against the world!");
	}else{
		ns.tprint ("> Doomsday attack launched against [" + target + "]!");
	}
}
