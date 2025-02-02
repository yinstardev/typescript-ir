import ts from "typescript";

export function extractComments(sourceFile: ts.SourceFile, node: ts.Node): string | undefined {
    const commentRanges = ts.getLeadingCommentRanges(sourceFile.text, node.pos);
    if (!commentRanges) return undefined;

    let formattedComment = commentRanges
        .map(range => sourceFile.text.substring(range.pos, range.end).trim())
        .join("\n");

    // Remove JSDoc markers (/** and */) while keeping content 
    // we will be adding those back while parsing to that language markers finally
    formattedComment = formattedComment.replace(/^\/\*\*+/, "").replace(/\*\/$/, "").trim();

    // Standardize multi-line comment formatting
    formattedComment = formattedComment
        .split("\n")
        .map(line => line.replace(/^\s*\*?/, "").trim())
        .join("\n");

    return formattedComment;
}