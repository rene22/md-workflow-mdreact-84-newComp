const fs = require('fs');
const { exec } = require('child_process');

const date = new Date()

exec(`git rev-parse --short HEAD`, function (error, stdout, stderr) {
    if (error !== null) {
        console.log("exec error: " + error);
    } else {

        var data = {
            "Version": `v${process.env.npm_package_version}`,
            "Build": stdout.trim().substr(0,6),
            "Build Date": date.getFullYear() + '-' + eval(date.getMonth() + 1) + '-' + date.getDate()
        }

        fs.writeFile("./dist/build.json", JSON.stringify(data), function (err) {
            if (err) {
                console.log('File write error!')
            } else {
                fs.readFile("./dist/index.html", "utf8", function (err, data) {
                    if (err) {
                        console.log ('File read error!')
                    } else {
                        var newData = data.replace('main.bundle.js', `main.bundle_${stdout.trim().substr(0,6)}.js`);

                        fs.writeFile("./dist/index.html", newData, 'utf8', function (err) {
                            if (err) {
                                console.log('File write error!');
                            } else {
                                console.log('Post build done!');
                            }
                        });
                    }

                })
            }
        });
    }
});
