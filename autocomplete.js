function AutoComplete(opts) {
  let self = this;
  let default_opts = {
    cmp: function (a,b) {
      
      return false;
    },
    render: function (results) {
      
    },
  };
  self.what = opts.what; // This is the data source
  self.who = opts.who; // This is the target element, you need to pass the element in
  self.cmp = opts.compare; // the comparison function
  self.min_chars = opts.min_chars; // This is how many characters before a search is made
  self.who.addEventListener('keyup', function (e) {
    let v = self.who.value;
    if ( v.length > self.min_chars ) {
      let results = [];
      for ( let i in self.what ) {
        if ( self.cmp(v,self.what[i]) ) {
          results.push(self.what[i]);
        }
      }
      if ( results.length > 0 ) {
        self.render(results); 
      }
    }
  };
  return self;
}
