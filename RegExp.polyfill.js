if ( RegExp.prototype.flags === undefined || RegExp.prototype.sticky === undefined )
  (function(global){

    var ORE = global.RegExp,
        OREP = ORE.prototype,
        PRE;

    function Extend( C, S ) {
      C.prototype = Object.create(S.prototype);
      C.prototype.constructor = C;
      C.Super = S;
      return C;
    }

    function _exec ( input ) {
      var oLastIndex, result;
      if ( ! this.sticky ) return OREP.exec.call( this, input );
      oLastIndex = this.lastIndex;
      this.lastIndex = 0;
      if ( (result = OREP.exec.call( this, input.slice( oLastIndex ) )) ) {
        if ( result.index ) {
          this.lastIndex = 0;
          result = null;
        } else {
          this.lastIndex += oLastIndex;
          this.input = this.$_ = input;
          result.index += oLastIndex;
          result.input = input;
        }
      }
      return result;
    }

    function _test ( input ) {
      var oLastIndex, result;
      if ( ! this.sticky ) return OREP.test.call( this, input );
      oLastIndex = this.lastIndex;
      this.lastIndex = 0;
      if ( (result = OREP.test.call( this, input.slice( oLastIndex ) )) ) {
        if ( this.leftContext ) {
          this.lastIndex = 0;
        } else {
          this.lastIndex += oLastIndex;
          this.input = this.$_ = input;
        }
      }
      return result;
    }

    if ( RegExp.prototype.sticky === undefined )
      global.RegExp = Extend( function ( source, _flags ) {
        var _sticky = (_flags || (_flags='')).indexOf( 'y' ) >= 0,
            re = ORE.call(this, source, _flags.replace('y', ''));
        Object.defineProperties( re, {
          flags: { value: _flags },
          sticky: { value: _sticky },
          exec: { value: _exec },
          test: { value: _test },
          toString: { value: function () {
              return ['/', this.source, '/', this.flags].join('')
          } }
        } );
        return re
      }, ORE );
    else
      global.RegExp = Extend( function ( source, _flags ) {
        var re = ORE.call(this, source, _flags || (_flags = ''));
        Object.defineProperties( re, {
          flags: { value: _flags },
          toString: { value: function () {
               return ['/', this.source, '/', this.flags].join('')
          } }
        } );
        return re
      }, ORE );

      RegExp.native =  ORE;
      
  })(typeof self === 'undefined' ? global : self)
