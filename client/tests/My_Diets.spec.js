expect(<div></div>).to.have.elementOfType('div')
expect(<div data-foo="bar"></div>).to.have.prop('data-foo', 'bar');

