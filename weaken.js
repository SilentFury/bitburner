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
  ns.print ("Security: " + ns.formatNumber (secLevel, 3, 1000, false) + 
    " | ETA: " + ns.tFormat(ns.getGrowTime(hostname)));

  while (true) {
    if (ns.getServerSecurityLevel (hostname) > secThresh) {
      out = await ns.weaken (hostname);
      ns.print ("Target security modified by " + ns.formatNumber (out, 3, 1000, false) + "!"); 
    } else {
      sleep (5000);
    }
    secLevel = ns.getServerSecurityLevel (hostname);
    ns.print ("Security: " + ns.formatNumber (secLevel, 3, 1000, false));
  }
}
