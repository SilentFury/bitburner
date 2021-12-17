/**
* @param {NS} ns
**/
export async function main (ns) {
	var host = ns.getHostname();
	var scanArray = [host];
	var currentScanLength = 0, index = 0;
	var previousScanLength, currentScanLength;
	var currentHost, newScan, i, j, command;

	if (ns.args.length == 0) {
		ns.tprint ("Error: Argument [0] is empty, must be a valid command.");
		ns.tprint ("For help use 'run botExec.js help'");
		ns.exit ();
	}
	command = ns.args[0];
	if (command != "killall" && command != "help") {
		ns.tprint ("Error: Invalid command. For help use 'run botExec.js help'");
		ns.exit ();
	}
	if (command == "help") {
		ns.tprint ("Valid commands");
		ns.tprint ("> killall - Terminates all processes on every botnet.");
		ns.tprint ("> help - Shows up all available commands");
		ns.exit ();
	}
	
	while (currentScanLength < scanArray.length) {
   		previousScanLength = currentScanLength;
    	currentScanLength = scanArray.length;
    	for (i = previousScanLength; i < currentScanLength; i++) {
     		currentHost = scanArray[i];
			if (ns.hasRootAccess(currentHost)) {
				if (currentHost != "home") {
					/* Botnet upload command */
					if (command == "killall" ) ns.killall (currentHost);
					/* Botnet upload command */
					index++;
				}
			}
        	newScan = ns.scan(currentHost);
        	for (j = 0; j < newScan.length; j++) {
            	if (scanArray.indexOf(newScan[j]) == -1) {
                	scanArray.push(newScan[j]);
            	}
        	}
   		}
	}
	ns.tprint ("> Execution data sent to " + index + " servers.");
}
