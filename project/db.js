var db = null;
var flag = "false";

// 데이터베이스 생성 및 오픈
function openDB() {
	db = window.openDatabase('id', '1.0', '회원정보DB', 1024 * 1024);
}

// 테이블 생성 트랜잭션 실행
function createTable() {
	db.transaction(function(tr) {
		var createSQL = 'create table if not exists setting(sound text, auto text)';
		tr.executeSql(createSQL, [], function() {

		}, function() {
		});
	}, function() {
	}, function() {
	});
}

function createTable2() {
	db.transaction(function(tr) {
		var createSQL = 'create table if not exists scenario2(job text, part integer primary key, explain text, si text, si2 text, si3 text, picture text )';
		tr.executeSql(createSQL, [], function() {

		}, function() {
		});
	}, function() {
	}, function() {
	});
}

function createTable3() {
	db.transaction(function(tr) {
		var createSQL = 'create table if not exists hint(job text, part integer primary key, explain text)';
		tr.executeSql(createSQL, [], function() {

		}, function() {
		});
	}, function() {
	}, function() {
	});
}

function createTable4() {
	db.transaction(function(tr) {
		var createSQL = 'create table if not exists record(part integer,pic integer, pic2 integer, pic3 integer, achieve integer, achieve2 integer, achieve3 integer, achieve4 integer)';
		tr.executeSql(createSQL, [], function() {

		}, function() {
		});
	}, function() {
	}, function() {
	});
}

function createTable5() {
	db.transaction(function(tr) {
		var createSQL = 'create table if not exists load(part integer, score integer)';
		tr.executeSql(createSQL, [], function() {

		}, function() {
		});
	}, function() {
	}, function() {
	});
}

function insert(i2, j2) {
	db.transaction(function(tr) {

		var insertSQL = 'insert into load(part, score) values(?, ?)';
		tr.executeSql(insertSQL, [i2, j2], function(tr, rs) {
			
		}, function(tr, err) {
			
		});

	});
}

function insert2() {
	db.transaction(function(tr) {
		var a = $('#si').val();
		var b = $('#si1').val();
		var c = $('#si2').val();
		var d = $('#si3').val();
		var e = $('#si4').val();
		var f = $('#si5').val();
		var g = $('#si6').val();
		var sub = g.substr(12, 20);
		var sub2 = "image\\" + sub;

		if (!(a == "" || b == "" || c == "" || g == "")) {
			var insertSQL = 'insert into scenario2(job, part, explain, si, si2, si3, picture) values(?, ?, ?, ?, ?, ?, ?)';
			tr.executeSql(insertSQL, [a, b, c, d, e, f, sub2], function(tr, rs) {
				$("#dialog6").dialog("open");
				$('#si').val('');
				$('#si1').val('');
				$('#si2').val('');
				$('#si3').val('');
				$('#si4').val('');
				$('#si5').val('');
				$('#si6').val('');

			}, function(tr, err) {
				$("#ale").dialog("open");

			});
		} else {
			$("#dialog52").dialog("open");
			$("#dialog7").dialog("open");

		}
	});
}

function insert3() {
	db.transaction(function(tr) {
		var a = $('#hi').val();
		var b = $('#hi1').val();
		var c = $('#hi2').val();

		if (!(a == "" || b == "" || c == "")) {
			var insertSQL = 'insert into hint(job, part, explain) values(?, ?, ?)';
			tr.executeSql(insertSQL, [a, b, c], function(tr, rs) {
				$("#dialog6").dialog("open");
				$('#hi').val('');
				$('#hi1').val('');
				$('#hi2').val('');

			}, function(tr, err) {
				$("#ale").dialog("open");

			});
		} else {

			$("#hint5").dialog("open");
			$("#dialog7").dialog("open");
		}
	});
}

function insert4() {
	db.transaction(function(tr) {
		var a = $('#sc').val();
		var b = $('#sa').val();

		var insertSQL = 'insert into setting(sound, auto) values(?, ?)';
		tr.executeSql(insertSQL, [a, b], function(tr, rs) {

		}, function(tr, err) {

		});
	});
}

function insert5(i) {
	db.transaction(function(tr) {

		if (i == 1)
			var insertSQL = 'update record set pic=? where part=0';
		if (i == 2)
			var insertSQL = 'update record set pic2=? where part=0';
		if (i == 3)
			var insertSQL = 'update record set pic3=? where part=0';

		tr.executeSql(insertSQL, [i], function(tr, rs) {

		}, function(tr, err) {

		});
	});
}

function select() {
	db.transaction(function(tr) {
		var selectSQL = 'select id, pw from info where id=? and pw=?';
		var id = $('#ID').val();
		var pw = $('#PW').val();

		if (!(id == "" || pw == "")) {

			tr.executeSql(selectSQL, [id, pw], function(tr, rs) {

				if (rs.rows.length > 0) {
					$('#ID').val('');
					$('#PW').val('');
					location.href = "main.html";

				} else {
					alert('아이디와 비밀번호를 다시 한번 확인해주세요');
					// 로그인 실패
					$('#ID').val('');
					$('#PW').val('');
				}
			});
		} else {
			alert('아이디와 비밀번호를 다시 한번 확인해주세요');

		}

	});
}

function select2(job, i) {
	db.transaction(function(tr) {
		var selectSQL = 'select explain, si, si2, si3, picture from scenario2 where job=? and part=?';
		var obj = document.getElementById('im');

		tr.executeSql(selectSQL, [job, i], function(tr, rs) {

			if (rs.rows.length > 0) {
				var a = rs.rows.item(0).explain;
				var b = rs.rows.item(0).si;
				var c = rs.rows.item(0).si2;
				var d = rs.rows.item(0).si3;
				var e = rs.rows.item(0).picture;

				$("#f").text("\r " + a);
				$("#s").text("\r " + b);
				$("#t").text("\r " + c);
				$("#fo").text("\r " + d);

				obj.src = e;

			} else {
				$("#fail2").dialog("open");
			}
		});

	});
}

function select3(i) {
	db.transaction(function(tr) {
		var selectSQL = 'select explain, si, si2, si3 from scenario2 where part=?';

		tr.executeSql(selectSQL, [i], function(tr, rs) {

			if (rs.rows.length > 0) {
				var a = rs.rows.item(0).explain;
				var b = rs.rows.item(0).si;
				var c = rs.rows.item(0).si2;
				var d = rs.rows.item(0).si3;

				$("#del2").val(a);
				$("#del3").val(b);
				$("#del4").val(c);
				$("#del5").val(d);

			} else {
				$("#dialog10").dialog("open");

			}
		});

	});
}

function select4(i) {
	db.transaction(function(tr) {
		var selectSQL = 'select explain from hint where part=?';

		tr.executeSql(selectSQL, [i], function(tr, rs) {

			if (rs.rows.length > 0) {
				var a = rs.rows.item(0).explain;

				$("#hi5").val(a);

			} else {
				$("#dialog10").dialog("open");

			}
		});

	});
}

function select5(i) {
	db.transaction(function(tr) {
		var selectSQL = 'select explain from hint where part=?';

		tr.executeSql(selectSQL, [i], function(tr, rs) {

			if (rs.rows.length > 0) {
				var a = rs.rows.item(0).explain;
				$("#hi5").val(a);

			} else {
				$("#dialog10").dialog("open");

			}
		});

	});
}

function select6(i, hintCount) {
	db.transaction(function(tr) {
		var selectSQL = 'select explain from hint where part=?';

		tr.executeSql(selectSQL, [i], function(tr, rs) {

			if (rs.rows.length > 0) {
				var a = rs.rows.item(0).explain;
				$("#hintbox").text("▶" + a);
				$("#dialogHint1").dialog("open");

				if (hintCount == 3) {
					$("#hint_num").text("2/3");
					hintCount--;
				} else if (hintCount == 2) {
					$("#hint_num").text("1/3");
					hintCount--;
				} else if (hintCount == 1) {
					$("#hint_num").text("0/3");
					hintCount--;
				}

				return hintCount;

			} else {
				$("#fail").dialog("open");
			}
		});

	});
}

function select7() {
	db.transaction(function(tr) {
		var selectSQL = 'select part,score from load';

		tr.executeSql(selectSQL, [], function(tr, rs) {

			if (rs.rows.length > 0) {
				var a = rs.rows.item(0).part;
				var b = rs.rows.item(0).score;
				
				$("#title2").val(a);
				$("#score1").text("Score : "+b);

			} else {
				
			}
		});

	});
}

function del(i) {
	db.transaction(function(tr) {

		var deleteSQL = 'delete from scenario2 where part = ?';
		tr.executeSql(deleteSQL, [i], function(tr, rs) {

			$("#dialog8").dialog("open");

		});
	});

}

function del2(i) {
	db.transaction(function(tr) {

		var deleteSQL = 'delete from hint where part = ?';
		tr.executeSql(deleteSQL, [i], function(tr, rs) {

			$("#dialog8").dialog("open");

		});
	});

}

function del3() {
	db.transaction(function(tr) {

		var deleteSQL = 'delete from setting';
		tr.executeSql(deleteSQL, [], function(tr, rs) {

		});
	});

}

function del4() {
	db.transaction(function(tr) {

		var deleteSQL = 'delete from load';
		tr.executeSql(deleteSQL, [], function(tr, rs) {

		});
	});

}

function record(i) {
	db.transaction(function(tr) {

		var flag = 0;
		var selectSQL = 'select pic,pic2,pic3 from record where part=?';

		tr.executeSql(selectSQL, [i], function(tr, rs) {

			if (rs.rows.length > 0) {

				var a = rs.rows.item(0).pic;
				var b = rs.rows.item(0).pic2;
				var c = rs.rows.item(0).pic3;

				if (a == 0 && b == 0 && c == 0) {
					$("#qt").dialog("open");
				}

				if (a == 1 && b == 0 && c == 0) {
					$("#qt2").dialog("open");
				}

				if (a == 0 && b == 2 && c == 0) {
					$("#qt3").dialog("open");
				}

				if (a == 0 && b == 0 && c == 3) {
					$("#qt4").dialog("open");
				}

				if (a == 1 && b == 2 && c == 0) {
					$("#qt5").dialog("open");

				}

				if (a == 1 && b == 0 && c == 3) {
					$("#qt6").dialog("open");

				}

				if (a == 0 && b == 2 && c == 3) {
					$("#qt7").dialog("open");

				}

				if (a == 1 && b == 2 && c == 3) {
					$("#qt8").dialog("open");

				}

				flag = 1;

			} else {
				$("#qt").dialog("open");
				var insertSQL = 'insert into record(part, pic, pic2, pic3) values(?, ?, ?, ?)';
				tr.executeSql(insertSQL, [0, 0, 0, 0], function(tr, rs) {

				}, function(tr, err) {

				});
			}

		});

	});
}

