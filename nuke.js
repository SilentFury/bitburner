/**
* @param {NS} ns
**/
export async function main (ns) {
  var hostname = ns.getHostname();
  var scanArray = [hostname];
  var currentScanLength = 0;
  var previousScanLength, currentScanLength, currentHost, newScan;
  var server, i, j, target, massmurder;

  if (ns.args.length == 0) {
    massmurder = await ns.prompt ("No target argument used, are you sure you want to fire a generic nuke attack?");
    if (!massmurder) {
      ns.tprint ("Attack aborted by user input.");
      ns.exit ();
    }
  }else{
    target = ns.args[0];
    if (!ns.serverExists (target)) {
      ns.tprint ("Error: Target host [" + target + "] does not exist.")
      ns.exit ()
    }
  }

  while (currentScanLength < scanArray.length) {
    previousScanLength = currentScanLength;
    currentScanLength = scanArray.length;
    for (i = previousScanLength; i < currentScanLength; i++) {
      currentHost = scanArray[i];
      server = ns.getServer(currentHost)
      if (ns.hasRootAccess (currentHost) && currentHost != "home" && !server.purchasedByPlayer) {
        /* Botnet executable commands */
        if (massmurder) target = currentHost;
        ns.exec ("optimize.js", currentHost, 1, "hack.js", target);
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
    ns.tprint ("> Botnet attack launched against [" + target + "]!");
  }
}
