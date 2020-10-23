import * as vscode from 'vscode';

function insertText(text: string) {
	const editor = vscode.window.activeTextEditor

	if (!editor) {
		vscode.window.showErrorMessage("Can't insert log if no document is open");
		return;
	}

	const { selection } = editor;
	const range = new vscode.Range(selection.start, selection.end);

	editor.edit(editBuilder => {
		editBuilder.replace(range, text);
	})
}

const toReplace: [RegExp, string][] = [
	[/\n/g, "\\n"],
	[/\t/g, "\\t"],
	[/&/g, "&#38;"],
	[/"/g, "&#34;"],
	[/'/g, "&#39;"],
	[/</g, "&#60;"],
	[/>/g, "&#62;"],
]

export function activate(context: vscode.ExtensionContext) {
	console.log('text-to-xml-safe-string is now active!');

	const formatText = vscode.commands.registerCommand('text-to-xml-safe-string.formatText', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		const { selection } = editor
		let text = editor.document.getText(selection);

		if (!text) return;

		toReplace.forEach(r => {
			text = text.replace(r[0], r[1])
		})

		// wrap in quotes
		text = `"${text}"`;

		await vscode.commands.executeCommand('editor.action.insertLineAfter');
		insertText(text)
	})
	context.subscriptions.push(formatText)
}

// this method is called when your extension is deactivated
export function deactivate() { }
