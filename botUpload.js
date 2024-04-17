/**
* @param {NS} ns
**/
export async function main (ns) {
	var host = ns.getHostname();
	var scanArray = [host];
	var currentScanLength = 0, index = 0;
	var previousScanLength, currentScanLength;
	var currentHost, newScan, i, j;
	var files = ["hack.js", "grow.js", "weaken.js", "optimize.js"];
	
	while (currentScanLength < scanArray.length) {
   		previousScanLength = currentScanLength;
    	currentScanLength = scanArray.length;
    	for (i = previousScanLength; i < currentScanLength; i++) {
     		currentHost = scanArray[i];
			if (ns.hasRootAccess(currentHost)) {
				if (currentHost != "home") {
					/* Botnet upload command */
					ns.scp (files, currentHost, "home");
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
	ns.tprint ("> Uploaded malware to " + index + " servers.");
}
