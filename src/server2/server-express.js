var express = require('express');
var http = require("http");
var fs = require("fs");

var app = express();


var gorescriptPath = "..";
var mapPath = gorescriptPath +"/game/assets/maps/";
var voxelMeshPath =  gorescriptPath + "/game/assets/voxel-meshes/";
var exportedMeshPath = gorescriptPath + "/game/assets/meshes/";
var serverPath = "/node/urlrewrite/server";

/// ===================== app 


app.use(express.static(gorescriptPath));

app.all('/', function (req, res) {
  res.send('What?');
});

app.post(serverPath  + '/save-map', function (req, res) {
    console.log('save-map!');
    processSaveFile(req, res, saveMap);
});

app.post(serverPath  + '/save-voxel-mesh', function (req, res) {
    console.log('save-voxel-mesh!');
  	processSaveFile(req, res, saveVoxelMesh);  	
});

app.post(serverPath  + '/save-exported-mesh', function (req, res) {
    console.log('save-exported-mesh!');
    processSaveFile(req, res, saveExportedMesh);
});

/// ===================== server

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Example app listening at http://%s:%s', host, port);
});

/// ===================== helpers

function processSaveFile(request, response, callback) {

	var data = "";
	request.on("data", function(chunk) {
		data += chunk;
		if (data.length > 1048576) {
			response.send("file larger than 1mb");
		}
	});

	request.on("end", function(err) {
		try {
			var obj = JSON.parse(data);			

			callback(obj, function(err) {
				if (err) {
					response.send("save error:\n" + err);
				} else {
          response.send("save success:\n");					
				}
			});
		} catch (e) {
			response.send("save error:\n" + e);
		}
	});
}

function saveMap(map, callback) {
	if (map.name === undefined) {
		throw "map doesn't have a name";
	}

	var json = JSON.stringify(map);
	var path = mapPath + map.name + ".js";

	fs.writeFile(path, json, callback);
}

function saveVoxelMesh(voxelMesh, callback) {
	if (voxelMesh.name === undefined) {
		throw "voxel mesh doesn't have a name";
	}

	var json = JSON.stringify(voxelMesh);
	var path = voxelMeshPath + voxelMesh.name + ".js";

	fs.writeFile(path, json, callback);
}

function saveExportedMesh(mesh, callback) {
	if (mesh.name === undefined) {
		throw "mesh doesn't have a name";
	}

	var path = exportedMeshPath + mesh.name + ".js";

	fs.writeFile(path, mesh.obj, callback);
}