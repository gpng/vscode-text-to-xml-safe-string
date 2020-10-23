# text-to-xml-safe-string README

Formats text to XML safe string, replace linebreaks (\\n), tabs (\\t), and special characters (&, ', ", <, >)

## Features

1.  Select text that you want formatted
2.  Open command palette with cmd+shift+p (Mac) or ctrl+shift+p (Windows)
3.  Search and select command "Text To XML Safe String"
4.  The string will be inserted below your selection, wrapped in quotes for use in code

## Example

Input:

```go
sql.Exec(`
    SELECT * FROM some_table
    WHERE name = $1
`, "John Doe")
```

Output:

```
"sql.Exec(`\n    SELECT * FROM some_table\n    WHERE name = $1\n`, &#34;John Doe&#34;)"
```


## TODO

* Configuration option for wrapping output in quotes or other text

* Output should be inserted after entire selection, not where the cursor ends the selection when select dragging 

## Contributing

Please contribute!

## License

MIT © 2020 [gpng](https://github.com/gpng)
