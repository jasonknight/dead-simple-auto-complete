function AutoComplete(options) {
    if ( typeof options == 'undefined' ) options = {};
    let self = this;
    let default_opts = {
        debug: false,
        container: document.createElement('DIV'),
        data_source: {},
        min_chars: 3,
        target: { addEventListener: function (a,f) { throw 'You need to set a target'; } },
        cmp: function (a,b) {
          self.log('comparing',a,b);
          if ( b.toLowerCase().indexOf(a.toLowerCase()) != -1 ) return true; 
          return false;
        },
        renderer: {
            results: function (results) {
                self.log("Rendering Results", results);
                self.renderer.clearRows.apply(self,[self.container]);
                for ( let i in results ) { self.renderer.row(results[i]); } 
                self.renderer.showContainer(self.container);    
            },
            row: function (row) {
                self.log("Row is", row);
                row = self.filters.row(row);
                let el = document.createElement('P');
                el.innerHTML = row;
                el.addEventListener('click',function (e) { self.on.rowclick.apply(el,[e]); });
                self.renderer.addRow(self.container,el);
            },
            addRow: function (c,r) {
                c.appendChild(r);
            },
            clearRows: function (c) {
                c.innerHTML = '';
            },
            showContainer: function () {
                self.container.style.display = 'block';
                self.container.style.position = 'absolute';
                let box = self.target.getBoundingClientRect();
                self.log("Box",box);
                self.container.style.left = box.left + 'px';
                self.container.style.top = box.bottom + 'px';
                self.filters.containerOnShow.apply(self,[]);
            },
            hideContainer: function () {
                self.container.style.display = 'none';
                self.filters.containerOnHide.apply(self,[]);
            },
        }, 
        on: {
            rowclick: function (e) {
                self.log("rowclick",e,this);
                self.target.value = this.innerText;
                self.renderer.hideContainer();
            },
            keyup: function (e) {
                self.log("keyup",e,this);
                let v = self.target.value;
                if ( v.length < self.min_chars ) { 
                    self.log("hiding container");
                    self.renderer.hideContainer();
                    return;
                }
                let results = [];
                self.log("searching",self.data_source);
                for ( let i in self.data_source ) {
                    if ( self.cmp(v,self.data_source[i]) ) { results.push(self.data_source[i]); }
                }
                self.log("Found", results);
                if ( results.length > 0 ) { self.renderer.results(self.filters.results(results)); }
            },
        },
        filters: { 
            results: function (r) { return r; }, 
            row: function (r) { return r; }, 
            containerOnShow: function () { },
            containerOnHide: function () { },
        }, 
        log: function () {
            if ( ! self.debug ) return;
            let args = [];
            for ( let i in arguments) args.push(arguments[i]);
            console.log.apply(null,args);
        },
    };
    self.log = default_opts.log;
    let set_opts = function (o,opts,dopts) {
        for ( let key in dopts ) {
            self.log("key", key);
            if ( typeof opts[key] != 'undefined' ) {
                self.log("key", key,typeof opts[key],opts[key] instanceof Element);
                if ( typeof opts[key] == 'object' && opts[key] instanceof Element == false ) {
                    if ( Array.isArray(opts[key]) ) { 
                        o[key] = opts[key]; 
                    } else { 
                        o[key] = {}; 
                        self.log("recurse setting",key);
                        o[key] = set_opts(o[key],opts[key],dopts[key]);
                    }
                } else { 
                    self.log("direct setting",key);
                    o[key] = opts[key]; 
                }
            } else { 
                self.log("setting default",key,dopts[key]);
                o[key] = dopts[key]; 
            }
        } 
        return o;
    };
    self = set_opts(self,options,default_opts);
    self.target.addEventListener('keyup', function (e) { self.on.keyup.apply(self.target,[e]); } );
    document.body.appendChild(self.container);
    self.container.style.display = 'none';
    self.container.className = "autocomplete-container";
}
