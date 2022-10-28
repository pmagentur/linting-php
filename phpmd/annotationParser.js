/**
 * @param xml
 * @returns {{endLine: string, path: string, startLine: string, annotationLevel: string, message: string}[]}
 */
const parseAnnotationsFromXml = function(xml) {
    const files = Array.isArray(xml.checkstyle.file) ? xml.checkstyle.file : [xml.checkstyle.file];

    const annotations = [];
    for (const file of files) {
        const path = file['@_name'];

        const errors = Array.isArray(file.error) ? file.error : [file.error];
        for (const error of errors) {
            const annotation = createAnnotationFromError(error, path);
            annotations.push(annotation);
        }
    }

    return annotations;
};

const createAnnotationFromError = function(error, path) {
    return {
        path: path,
        startLine: error['@_line'],
        endLine: error['@_endline'],
        annotationLevel: error['@_severity'],
        message: error['@_message'].replace(/&#039;/g, "'")
    };
};

module.exports = {
    parseAnnotationsFromXml
}
