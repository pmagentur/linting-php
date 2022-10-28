/**
 * @param lintingOutput
 * @returns {{endLine: string, path: string, startLine: string, annotationLevel: string, message: string}[]}
 */
const parseAnnotations = function(lintingOutput) {
    const fileNamePattern = /^(?<file>.+) \(\d+ errors?\)/;
    const errorPattern = /^\[(?<line>\d+)]: (?<message>.*)/;

    const lines = lintingOutput.split('\n');
    let path = undefined;
    const annotations = [];
    for (const line of lines) {
        const fileNameMatch = fileNamePattern.exec(line);
        if (fileNameMatch) {
            path = fileNameMatch.groups.file;
        } else {
            const errorMatch = errorPattern.exec(line);
            if (errorMatch) {
                const annotation = createAnnotationFromError(errorMatch.groups, path);
                annotations.push(annotation);
            }
        }
    }

    return annotations;
};

const createAnnotationFromError = function(error, path) {
    return {
        path: path,
        startLine: error.line,
        endLine: error.line,
        annotationLevel: 'error',
        message: error.message
    };
};

module.exports = {
    parseAnnotations
}
