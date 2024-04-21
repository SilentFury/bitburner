/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog ("ALL");
  if (ns.args.length == 0) {
    ns.tprint ("Error: Missing arguments, must be a valid hostname.");
    ns.exit ();
  }

  var hostname = ns.args[0];
  const secThresh = ns.getServerMinSecurityLevel (hostname);
  var secLevel = ns.getServerSecurityLevel (hostname);
  var out;

  ns.print ("~~~~~~~~~~~~~~~~~~~");
	ns.print ("Begin weakening process of [" + hostname + "]");
  ns.print ("Minimum Security: " + ns.formatNumber (ns.getServerMinSecurityLevel(hostname), 2, 1000, false) 
    + " | Threshold: " + ns.formatNumber (secThresh, 2, 1000, false));
  ns.print ("Current security: " + ns.formatNumber (secLevel, 2, 1000, false) + 
    " | ETA: " + ns.tFormat(ns.getWeakenTime(hostname)));

  while (true) {
    if (secLevel > secThresh) {
      out = await ns.weaken (hostname);
		  ns.print ("Target security modified by " + ns.formatNumber (out, 2, 1000, false) + "!"); 
    } else {
      await ns.sleep (5000);
    }
    secLevel = ns.getServerSecurityLevel (hostname);
		ns.print ("Current security: " + ns.formatNumber (secLevel, 2, 1000, false) + 
      " | ETA: " + ns.tFormat(ns.getWeakenTime(hostname)));
  }
}
