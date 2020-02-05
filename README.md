# Dead Simple Javascript Auto Complete

I was really tired of complicated solutions that claimed to be simple when they aren't. This is a dead simple, single file, copy pasteable, hackable auto-complete.

No stupid NPM, no silly ES6. Just vanilla javascript.

Open up test.html to see how to use it.

## Basic Usage

```html
<input id="target" />
<script type="text/javascript">
    (function () {
        let a = new AutoComplete({ 
            data_source: ['One Mississippi','Two Mississippi'],
            target: document.getElementById('target'), 
            debug: false,
        });
        console.log(a);
    })();
</script>
<style type="text/css">
    div.autocomplete-container {
        border: 1px solid #333;
        border-radius: 5px;
        padding: 4px;
    }
    div.autocomplete-container p {
        margin: 2px;
        cursor: pointer;
        z-index: 100;
    }
</style>
```
