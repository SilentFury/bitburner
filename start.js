/** @param {NS} ns **/
export async function main(ns) {
    var url = "https://raw.githubusercontent.com/SilentFury/bitburner/main/";
    var files = [
        "botExec.js",
        "botUpload.js",
        "break.js",
        "buyServer.js",
        "connect.js",
        "custom-stats.js",
        "grow.js",
        "hack.js",
        "nuke.js",
        "optimize.js",
        "overview.js",
        "rmServer.js",
        "scanner.js",
        "weaken.js"
        ]
    var out, i, source, count = 0;
    ns.tprint ("Downloading necessary scripts...");
    for (i=0; i<files.length; i++) {
        source = url + "" + files[i];
        out = await ns.wget (source, files[i], ns.getHostname());
        if (out) {
            ns.tprint ("> " + files[i] + " downloaded");
            count++;
        }else{
            ns.tprint ("> failed to get " + files[i]);
        }
        await ns.sleep (500);
    }
    ns.tprint ("Download finished! " + count + " out of " + files.length + " files successfully downloaded.");
}
