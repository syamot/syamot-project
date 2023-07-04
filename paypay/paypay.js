//. app.js

var express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    router = express();

var settings = require( '../settings' );

var PAYPAY = require( '@paypayopa/paypayopa-sdk-node' );
PAYPAY.Configure({
  clientId: settings.apikey,
  clientSecret: settings.apisecret,
  merchantId: settings.merchantid,
  productionMode: settings.productionMode
});

router.use( bodyParser.urlencoded( { extended: true }) );  //. body-parser deprecated undefined extended
router.use( bodyParser.json() );

//. https://www.paypay.ne.jp/opa/doc/v1.0/dynamicqrcode#operation/createQRCode
router.post( '/qrcode', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  if( req.body.amount ){
    var payload = {
      merchantPaymentId: generateId( 'dotnsf-paypay' ),
      amount: { amount: req.body.amount, currency: "JPY" },
      codeType: "ORDER_QR",
      orderDescription: ( req.body.orderDescription ? req.body.orderDescription : 'orderDescription' ),
      isAuthorization: false,
      redirectUrl: "https://paypay.ne.jp/",
      redirectType: "WEB_LINK",
      userAgent: ( req.body.userAgent ? req.body.userAgent : 'My PayPay App/1.0' )
    };
    PAYPAY.QRCodeCreate( payload, function( response ){
      //console.log( response );
      if( response.STATUS && response.STATUS >= 200 && response.STATUS < 300 ){   //. 実際は 201
        res.write( JSON.stringify( { status: response.STATUS, body: JSON.parse( response.BODY ) } ) );
        res.end();
      }else{
        res.status( response.STATUS );
        res.write( JSON.stringify( { status: response.STATUS, body: JSON.parse( response.BODY ) } ) );
        res.end();
      }
    });
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { status: 400, error: 'no amount info found.' } ) );
    res.end();
  }
});

router.delete( '/qrcode/:codeId', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  if( req.params.codeId ){
    PAYPAY.QRCodeDelete( Array( req.params.codeId ), function( response ){
      //console.log( response );
      if( response.STATUS && response.STATUS >= 200 && response.STATUS < 300 ){   //. 実際は 201
        res.write( JSON.stringify( { status: response.STATUS, body: JSON.parse( response.BODY ) } ) );
        res.end();
      }else{
        res.status( response.STATUS );
        res.write( JSON.stringify( { status: response.STATUS, body: JSON.parse( response.BODY ) } ) );
        res.end();
      }
    });
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { status: 400, error: 'no codeId info found.' } ) );
    res.end();
  }
});

router.get( '/payment/confirm/:merchantPaymentId', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  if( req.params.merchantPaymentId ){
    PAYPAY.GetCodePaymentDetails( Array( req.params.merchantPaymentId ), function( response ){
      //console.log( response );
      if( response.STATUS && response.STATUS >= 200 && response.STATUS < 300 ){   //. 実際は 201
        res.write( JSON.stringify( { status: response.STATUS, body: JSON.parse( response.BODY ) } ) );
        res.end();
      }else{
        res.status( response.STATUS );
        res.write( JSON.stringify( { status: response.STATUS, body: JSON.parse( response.BODY ) } ) );
        res.end();
      }
    });
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { status: 400, error: 'no merchantPaymentId info found.' } ) );
    res.end();
  }
});

router.post( '/payment/cancel/:merchantPaymentId', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  if( req.params.merchantPaymentId ){
    PAYPAY.PaymentCancel( Array( req.params.merchantPaymentId ), function( response ){
      //console.log( response );
      if( response.STATUS && response.STATUS >= 200 && response.STATUS < 300 ){   //. 実際は 201
        res.write( JSON.stringify( { status: response.STATUS, body: JSON.parse( response.BODY ) } ) );
        res.end();
      }else{
        res.status( response.STATUS );
        res.write( JSON.stringify( { status: response.STATUS, body: JSON.parse( response.BODY ) } ) );
        res.end();
      }
    });
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { status: 400, error: 'no merchantPaymentId info found.' } ) );
    res.end();
  }
});

router.post( '/payment/refund/:merchantPaymentId', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  if( req.params.merchantPaymentId ){
    var payload = {
      merchantPaymentId: req.params.merchantPaymentId,
      paymentId: req.body.paymentId,
      amount: { amount: req.body.amount, currency: "JPY" },
      reason: req.body.reason
    };
    PAYPAY.PaymentRefund( payload, function( response ){
      //console.log( response );
      if( response.STATUS && response.STATUS >= 200 && response.STATUS < 300 ){   //. 実際は 201
        res.write( JSON.stringify( { status: response.STATUS, body: JSON.parse( response.BODY ) } ) );
        res.end();
      }else{
        res.status( response.STATUS );
        res.write( JSON.stringify( { status: response.STATUS, body: JSON.parse( response.BODY ) } ) );
        res.end();
      }
    });
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { status: 400, error: 'no merchantPaymentId info found.' } ) );
    res.end();
  }
});


function timestamp2datetime( ts ){
  if( ts ){
    var dt = new Date( ts );
    var yyyy = dt.getFullYear();
    var mm = dt.getMonth() + 1;
    var dd = dt.getDate();
    var hh = dt.getHours();
    var nn = dt.getMinutes();
    var ss = dt.getSeconds();
    var datetime = yyyy + '-' + ( mm < 10 ? '0' : '' ) + mm + '-' + ( dd < 10 ? '0' : '' ) + dd
      + ' ' + ( hh < 10 ? '0' : '' ) + hh + ':' + ( nn < 10 ? '0' : '' ) + nn + ':' + ( ss < 10 ? '0' : '' ) + ss;
    return datetime;
  }else{
    return "";
  }
}

function generateId( prefix ){
  var s = 1000;
  var id = ( new Date().getTime().toString(16) ) + Math.floor( s * Math.random() ).toString(16);
  if( prefix ){
    id = prefix + '-' + id;
  }

  return id;
}


module.exports = router;
