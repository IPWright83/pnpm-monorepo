const fs = require("fs");
const { spawn } = require("child_process");

const inquirer = require("inquirer");

const packageFolders = ["apps", "packages"];

/**
 * Gets a list of all the package names that contain the given script name
 * @param {String} scriptName       The name of the script we want to run
 * @param {String} folder           The name of the folder containing pnpm projects
 * @return {Array<String>}          A set of package names that could be run
 */
const getPackageNamesWithScript = (scriptName, folder) => {
    return fs
        .readdirSync(folder)
        .filter((dir) => fs.existsSync(`${folder}/${dir}/package.json`))
        .map((dir) => JSON.parse(fs.readFileSync(`${folder}/${dir}/package.json`, "utf8")))
        .filter((package) => package.scripts[scriptName])
        .map((package) => package.name);
};

/**
 * Prompts for a selection from the available packages
 * @param {String} scriptName - The name of the script we want to run
 * @return {Promise<string>} A promise that resolves with the name of the package, or "all"
 */
const getChoice = (scriptName) => {
    const packageNames = packageFolders.flatMap((folder) => getPackageNamesWithScript(scriptName, folder));

    // Let the user select a choice and resolve with the response
    return new Promise((resolve) => {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "package",
                    message: "For which package?",
                    choices: packageNames,
                },
            ])
            .then((answers) => resolve(answers.package));
    });
};

/**
 * Runs a particlar command for the selected choice
 * @param {string} scriptName       - The name of the script to run such as `test` or `storybook`
 * @param {string} choice           - The choice of package that the user selected
 * @param {Array<string>} extraArgs - Any additional args that the user supplied
 * @return {void}
 */
const runForChoice = (scriptName, choice, extraArgs = []) => {
    if (extraArgs.length > 0) {
        extraArgs = ["--", ...extraArgs];
    }

    const args = ["turbo", "run", scriptName, `--filter=${choice}`, ...extraArgs];

    spawn("pnpm", args, { stdio: "inherit" });
};

(async function () {
    const args = process.argv.slice(2, 3);
    if (args.length < 1) {
        console.error("Incorrect number of arguments. Expected 1 argument e.g. 'test' or 'storybook'");
    }

    const scriptName = args[0];
    const choice = await getChoice(scriptName);
    const extraArgs = process.argv.slice(3);

    runForChoice(scriptName, choice, extraArgs);
})();
