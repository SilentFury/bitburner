/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog ("ALL");
  if (ns.args.length == 0) {
    ns.tprint ("Error: Missing arguments, must be a valid hostname.");
    ns.exit ();
  }

  var hostname = ns.args[0];
  const moneyThresh = ns.getServerMaxMoney (hostname) * 0.75;
  var bankAmount = ns.getServerMoneyAvailable (hostname)
  var out;

  ns.print ("~~~~~~~~~~~~~~~~~~~");
  ns.print ("Begin bank spoofing process of [" + hostname + "]");
  ns.print ("Cash: $" + ns.formatNumber(bankAmount, 2, 1000, false) + 
    " | ETA: " + ns.tFormat(ns.getGrowTime (hostname)));

  while (true) {
    if (ns.getServerMoneyAvailable (hostname) < moneyThresh) {
      out = await ns.grow (hostname);
      ns.print ("Target bank modified by " + ns.formatPercent (out, 4, 100, false) + "%!");
    } else {
      sleep (5000);
    }
    bankAmount = ns.getServerMoneyAvailable (hostname);
    ns.print ("Cash: $" + ns.formatNumber (bankAmount, 2, 1000, false));
  }
}
