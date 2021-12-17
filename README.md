# bitburner

/** @param {NS} ns **/
export async function main(ns) {
    var source = "https://github.com/SilentFury/bitburner/blob/02c991e63e8e8533ac087d00f7195f8f6491097b/";
    var files = ["hack.js", "break.js", "grow.js", "weaken.js", 
                "buyServer.js", "rmServer.js", "botExec.js", "botUpload.js"];
    var out, i, count = 0;
    ns.tprint ("Downloading necessary scripts...");
    for (i=0; i<files.length; i++) {
        out = await ns.wget (source + "" + files[i], files[i], "home");
        if (out) {
            ns.tprint ("> " + files[i] + " downloaded");
            count++;
        }else{
            ns.tprint ("> failed to get " + files[i]);
        }
        ns.sleep (1000);
    }
    ns.tprint ("Download finished! " + count + "out of " + files.length + " files successfully downloaded.");
}
