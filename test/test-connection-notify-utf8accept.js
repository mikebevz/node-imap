var assert = require('assert'),
    net = require('net'),
    Imap = require('../lib/Connection'),
    result;

var CRLF = '\r\n';

var RESPONSES = [
  ['* CAPABILITY IMAP4rev1',
   'A0 OK Thats all she wrote!',
   ''
  ].join(CRLF),
  ['* CAPABILITY IMAP4rev1 ENABLE NOTIFY',
   'A1 OK authenticated (Success)',
   ''
  ].join(CRLF),
  ['* ENABLED',
   'A2 OK Success',
   ''
  ].join(CRLF),
  ['A3 OK Success',
   ''
  ].join(CRLF),
  ['* LIST (\\Noselect) "/" "/"',
   'A4 OK Success',
   ''
  ].join(CRLF),
  ['* 941 EXISTS',
   '* OK [UIDNEXT 486028] next uid',
   '* 0 RECENT',
   '* 941 EXISTS',
   '* OK [UIDVALIDITY 5] uid validity',
   '* OK [UNSEEN 144] first unseen',
   'A5 OK [READ-ONLY] done',
   ''
  ].join(CRLF),
  ['* 1 FETCH (UID 1 FLAGS () INTERNALDATE "01-Feb-2019 22:25:37 +0000")',
   'A6 OK Success',
   '* 2 FETCH (UID 2)',
   '* 2 OK unsolicited untagged response like one from gmail',
   ''
  ].join(CRLF),
  ['* LIST (\\Noselect) "/" "/"',
   '* LIST () "/" "भारत"',
   '* LIST () "/" "&-"',
   'A7 OK Success',
   ''
  ].join(CRLF),
  ['A8 OK Success',
   ''
  ].join(CRLF),
];

var srv = net.createServer(function(sock) {
  sock.write('* OK asdf\r\n');
  var buf = '', lines;
  sock.on('data', function(data) {
    buf += data.toString('utf8');
    if (buf.indexOf(CRLF) > -1) {
      lines = buf.split(CRLF);
      buf = lines.pop();
      lines.forEach(function() {
        sock.write(RESPONSES.shift());
      });
    }
  });
});
srv.listen(0, '127.0.0.1', function() {
  var port = srv.address().port;
  var imap = new Imap({
    user: 'foo',
    password: 'bar',
    host: '127.0.0.1',
    port: port,
    keepalive: false
  });
  imap.on('ready', function() {
    imap.openBox('INBOX', true, function () {
      imap.fetch(1).on('end', function () {
        imap.getBoxes(function(err, boxes) {
          assert.deepEqual(Object.keys(boxes),
                           [ '', 'भारत', '&' ]);
          srv.close()
          imap.end()
        });
      })
    })
  });
  imap.connect();
});


