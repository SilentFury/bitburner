/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog ("ALL");
  if (ns.args.length == 0) {
    ns.tprint ("Error: Missing arguments, must be a valid hostname.");
    ns.exit ();
  }

  var hostname = ns.args[0];
  const bankThresh = ns.getServerMaxMoney (hostname) * 0.75;
  var bankAmount = ns.getServerMoneyAvailable (hostname)
  var out;

  ns.print ("~~~~~~~~~~~~~~~~~~~");
  ns.print ("Begin bank spoofing process of [" + hostname + "]");
  ns.print ("Max Cash: " + ns.formatNumber (ns.getServerMaxMoney(hostname), 2, 1000, false) 
    + " | Threshold: " + ns.formatNumber (bankThresh, 2, 1000, false));
  ns.print ("Current cash: $" + ns.formatNumber(bankAmount, 2, 1000, false) + 
    " | ETA: " + ns.tFormat(ns.getGrowTime (hostname)));
  while (true) {
    if (bankAmount < bankThresh) {
      out = await ns.grow (hostname);
      ns.print ("Target bank modified by x" + ns.formatNumber (out, 4, 1000, false) + "!");
    } else {
      await ns.sleep (5000);
    }
    bankAmount = ns.getServerMoneyAvailable (hostname);
		ns.print ("Current cash: $" + ns.formatNumber(bankAmount, 2, 1000, false) + 
      " | ETA: " + ns.tFormat(ns.getGrowTime (hostname)));
  }
}
