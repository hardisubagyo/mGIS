<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>GIS</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">

        <!-- Leaflet -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js" integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg==" crossorigin=""></script>

        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="ext/customScroll/css/jquery.mCustomScrollbar.css" rel="stylesheet">
        <link href="css/style.default.css" rel="stylesheet">

        <!-- FONT AWESOME CDN -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

        <!-- <script src="js/L.TileLayer.BetterWMS.js"></script> -->

        <link rel="stylesheet" href="css/L.Control.Basemaps.css" />
        <script src="js/L.Control.Basemaps.js"></script>

        <!-- Select2 -->
        <link rel="stylesheet" href="select2/dist/css/select2.min.css">

        <!-- Styles -->
        <style>
            #map {
                width: 600px;
                height: 400px;
            }
            .loader {
              position: absolute;
              left: 50%;
              top: 50%;
              z-index: 1;
              width: 150px;
              height: 150px;
              margin: -75px 0 0 -75px;
              border: 16px solid #f3f3f3;
              border-radius: 50%;
              border-top: 16px solid #3498db;
              width: 120px;
              height: 120px;
              -webkit-animation: spin 2s linear infinite;
              animation: spin 2s linear infinite;
            }
            .leaflet-popup-content-wrapper {
                background: #e6e6e6;
                color: #000;
                width: 300px;
            }

            /* Safari */
            @-webkit-keyframes spin {
              0% { -webkit-transform: rotate(0deg); }
              100% { -webkit-transform: rotate(360deg); }
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .mygrid-wrapper-div {
                overflow: scroll;
                height: 200px;
            }

            .info { padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } 
            .info h4 { margin: 0 0 5px; color: #777; }

            .legend { text-align: left; line-height: 18px; color: #555; } 

            .legend i { width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7; }

            .loader {
              position: absolute;
              left: 50%;
              top: 50%;
              z-index: 1;
              width: 150px;
              height: 150px;
              margin: -75px 0 0 -75px;
              border: 16px solid #f3f3f3;
              border-radius: 50%;
              border-top: 16px solid #3498db;
              width: 120px;
              height: 120px;
              -webkit-animation: spin 2s linear infinite;
              animation: spin 2s linear infinite;
            }

            /* Safari */
            @-webkit-keyframes spin {
              0% { -webkit-transform: rotate(0deg); }
              100% { -webkit-transform: rotate(360deg); }
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }


        </style>
    </head>
    <body>
        
        <nav class="navbar navbar-default nav-fixed-top" role="navigation" id="app-nav-bar" >
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Monitoring GIS</a>
            </div>

            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Pencarian<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a data-toggle="modal" data-target="#PencarianPerusahaan">Perusahaan</a>
                            </li>
                            <li>
                                <a data-toggle="modal" data-target="#PencarianWilayah">Wilayah</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="modal fade" id="PencarianPerusahaan" role="dialog">
            <div class="modal-dialog">
            
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Pencarian Berdasarkan Perusahaan</h4>
                </div>
                <div class="modal-body">
                    <form id="CariPerusahaan">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Pilih Perusahaan</label>
                            <select class="form-control select2" style="width: 100%"; id="Perusahaan">
                                @foreach($perusahaan as $item)
                                    <option value="{{ $item->id_perusahaan }}">{{ $item->nama }}</option>
                                @endforeach
                            </select>
                            <!-- <input type="hidden" name="tipe" id="tipe" value="Perusahaan"> -->
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" onclick="cariPerusahaan()">Cari</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>

        <div class="modal fade" id="PencarianWilayah" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Pencarian Berdasarkan Wilayah</h4>
                    </div>
                    
                        <div class="modal-body">
                            <form id="FrmWilayah">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Pilih Provinsi</label>
                                    <select class="form-control select2" style="width: 100%"; id="Provinsi">
                                        @foreach($provinsi as $item)
                                            <option value="{{ $item->kode_provinsi }}">{{ $item->nama_provinsi }}</option>
                                        @endforeach
                                    </select>

                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" onclick="cariWilayah()">Cari</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
                        </div>
                </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="showDataProv" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Detail Data </h4>
                    </div>
                    
                        <div class="modal-body">
                            <form id="Wilayah">
                                <div class="form-group">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Region</th>
                                                <th>Provinsi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td id="Region"></td>
                                                <td id="Provinsi-Prov"></td>
                                            </tr>
                                    </table>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
                        </div>
                </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="showDataKab" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Detail Data </h4>
                    </div>
                    
                        <div class="modal-body">
                            <ul class="nav nav-tabs">
                                <li class="active"><a data-toggle="tab" href="#home">Data 1</a></li>
                                <li><a data-toggle="tab" href="#menu1">Data 1</a></li>
                            </ul>

                            <div class="tab-content">
                                <div id="home" class="tab-pane fade in active">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Provinsi</th>
                                                <td id="Provinsi-kab"></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Kabupaten/Kota</th>
                                                <td id="KabKota"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="menu1" class="tab-pane fade">
                                  <h3>Menu 1</h3>
                                  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
                        </div>
                </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="DataDetail" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Detail Data </h4>
                    </div>
                    
                        <div class="modal-body">
                            <ul class="nav nav-tabs">
                                <li class="active"><a data-toggle="tab" href="#DataPerusahaan">Data Perusahaan</a></li>
                                <li><a data-toggle="tab" href="#DataKabupaten">Data Kabupaten</a></li>
                            </ul>

                            <div class="tab-content">
                                <div id="DataPerusahaan" class="tab-pane fade in active">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Nama Perusahaan</th>
                                                <td id="NamaPerusahaan"></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Alamat</th>
                                                <td id="Alamat"></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">No Telp</th>
                                                <td id="NoTelp"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="DataKabupaten" class="tab-pane fade">
                                  <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Nama Kabupaten</th>
                                                <td id="NamaKabupaten"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
                        </div>
                </div>
            </div>
          </div>
        </div>

        <div class="modal" id="Loading">
            <div class="loader"></div>
        </div>

        

        <div id="map-canvas" ></div>

        <script src="js/jquery-1.10.2.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="ext/customScroll/js/jquery.mCustomScrollbar.min.js"></script>
        <script src="ext/customScroll/js/jquery.mousewheel.min.js"></script>
        <script src="js/application.js"></script>

        <script src="select2/dist/js/select2.full.min.js"></script>

        <!-- <script src="js/Leaflet.Control.Custom.js"></script> -->
        
        <script src="js/map.js"></script>

        <script>
            $(function () {
                $('.select2').select2()
            });
        </script>
        
    </body>
</html>
