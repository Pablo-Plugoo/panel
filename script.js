
function loadFunctions(){
    $("head").append(`<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.0/jszip.min.js"></script>`)
    $("body").prepend(`<div class="tab-content">
                                        <div class="box-section">
                                            <div class="title flex justify-between align-center">
                                                <div class="flex align-center">
                                                    <span>Download de arquivos</span>
                                                    <span tooltip="Selecione a opção para baixar as configurações presentes no tema ou as imagens que esta utilizando atualmente." flow="right">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="icon-tooltip" style="width:">
                                                            <path fill-rule="evenodd" d="M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div class="check-drag">
                                                    <a id="bkp-download-plugoo-config" download="PlugooBackupConfigurations.zip">Configurações</a> 
                                                    <a id="bkp-download-plugoo-image" download="PlugooBackupImages.zip">Imagens</a> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-section">
                                            <div class="title flex justify-between align-center">
                                                <div class="flex align-center">
                                                    <span>Upload de arquivos</span>
                                                    <span tooltip="Já possui um arquivo de configuração backup de tema anterior? Selecione o arquivo de backup de configurações no formato zip e aguarde." flow="right">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="icon-tooltip" style="width:">
                                                            <path fill-rule="evenodd" d="M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div id="inputToBackup" class="area-file">
                                                        <div>
        <input type="hidden" name="bkp_uploader" id="bkp_uploader" value="">
          <a data-toggle="modal" data-target="#myModalbkp_uploader" id="l-bg_news" href="#m-bg_news"> <img src="https://images.tcdn.com.br/1162797/themes/27/" class="img-thumbnail" style="width:100px"></a>
          <div class="modal fade" id="myModalbkp_uploader" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div style="margin: 0 auto !important;" class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                  <p> bkp_uploader </p>
                </div>
                <div class="modal-body">
                  <img src="https://images.tcdn.com.br/1162797/themes/27/" style="max-width:100%">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    <input type="file" id="bkp-upload-plugoo" name="bkp_uploader" class="">
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>`)
    
    
    
    plugooBkpJson = function(){
        var dados = [];
        var zipArchivesJson = new JSZip()
        $(".netzee-dashboard-panel input[name][value],.plugoo-dashboard-panel input[name][value]").each(function () {
            var name = $(this).attr("name");
            var value = $(this).attr("value");
            var parNomeValor = {};
    
            if($(this).attr("type") === "radio" && $(this).is(":checked")){
                parNomeValor[name] = `${value} [checked]`;
            }
            else if($(this).attr("type") === "checkbox" && $(this).is(":checked")) {
                parNomeValor[name] = `${value} [checked]`;
            }
            else if (value.includes("/img/")) {
                parNomeValor[name] = value;
            }
            else {
                parNomeValor[name] = value;
            }
            dados.push(parNomeValor);
        });
        
        var jsonData = JSON.stringify(dados);
        zipArchivesJson.file("dados.json", jsonData)
    
        zipArchivesJson.generateAsync({ type: "blob" }).then(function (content) {
            const zipBlob = new Blob([content], { type: 'application/zip' });
            var zipUrl = URL.createObjectURL(zipBlob);
            $("#bkp-download-plugoo-config").attr(`href`, `${zipUrl}`)
            document.getElementById("bkp-download-plugoo-config").click();
        }).catch(error => console.log("Erro ao criar o arquivo ZIP: " + error));
    }
    plugooBkpImg = function(){
        var zipArchivesImg = new JSZip()
        var images = [];
        const urlImgsObject = {
            main: "https://images.tcdn.com.br",
            path: `/files/${$('#url-host-images').val().split("/themes/")[0].split("br/")[1].trim()}/themes/${$('#url-host-images').val().split("/themes/")[1].trim()}/img/settings/`
        }
        $(".netzee-dashboard-panel input[name][value], .plugoo-dashboard-panel input[name][value]").each(function () {
            var value = $(this).attr("value");
            if (value.includes("/img/")) {
                // const urlImg = $(this).closest(".area-file").find(".img-thumbnail").attr("src").replace("//img", "/img");
                const urlImg = urlImgsObject.main + urlImgsObject.path + value.split("/").pop()
                const nameImgToUp = value.split("/").pop();
                const folder = zipArchivesImg.folder("imagens");
                var loadImg = fetch(urlImg)
                    .then(response => response.blob())
                    .then(blob => {
                        folder.file(nameImgToUp, blob);
                        console.log("Imagem baixada:", nameImgToUp);
                    })
                    .catch(error => console.error("Erro ao baixar imagem:", error));
                images.push(loadImg);
            }
        });
        Promise.all(images).then(() => {
            zipArchivesImg.generateAsync({ type: "blob" })
                .then(function (content) {
                    const zipBlob = new Blob([content], { type: 'application/zip' });
                    var zipUrl = URL.createObjectURL(zipBlob);
                    $("#bkp-download-plugoo-image").attr(`href`, `${zipUrl}`);
                    document.getElementById("bkp-download-plugoo-image").click();
                })
                .catch(error => console.log("Erro ao criar o arquivo ZIP: " + error));
        });
    }
    
    
    $("#bkp-download-plugoo-config, #bkp-download-plugoo-image").on("click", function () {
        if (!$(this).attr("href") && $(this).is("#bkp-download-plugoo-config")){
            plugooBkpJson()
        }
        else if (!$(this).attr("href") && $(this).is("#bkp-download-plugoo-image")) {
            plugooBkpImg()
        }
        else {
            alert("Iniciando download, isso pode levar alguns segundos dependendo da velocidade de sua internet, por favor aguarde! Clique em OK para prosseguir")
        }
    })
    
    
    
    
    
    uploadBkp = function(){
        backModeSave = function() {
            document.getElementById("btn-customize-save").click();
            let observedElement = $('#success-alert').get(0);
            let config = {
                attributes: true
            };
            let observer = new MutationObserver(function(mutations) {
                let target = $(mutations[0].target);
                if (target.is(':visible') && !target.attr('style').includes('opacity')) {
                    window.location.reload()
                }
        
            });
            observer.observe(observedElement, config);
        
        }
        
        
        function processJSON(jsonObject) {
            function replacerChecker(element) {
                return element.replace("[checked]", "").replace(" ", "").trim()
            }
    
            // [ ] Refinar o script na questão do upload das imagens, deixar uma opção para escolher se deseja salvar ou não

            jsonObject.forEach(function(obj) {
                for (const key in obj) {
                    if (Object.hasOwnProperty.call(obj, key)) {
                        var JSONval = obj[key];
                        $(`.plugoo-dashboard-panel input[name="${key}"], .netzee-dashboard-panel input[name="${key}"]`).each(function() {
                            let elementName = $(this).attr("name");
                            let elementVal = $(this).val();
                            if ($(this).attr("type") === "radio") {
                                if ($(this).attr("checked") && JSONval.indexOf("[checked]") > 1) {
                                    let updatedConfig = replacerChecker(JSONval);
                                    if (elementVal != updatedConfig) {
                                        $(this).closest(".item.flex").find(`[value="${updatedConfig}"]`).click()
                                    }
                                }
                            } else if ($(this).attr("type") === "checkbox") {
        
                                if (JSONval.indexOf("[checked]") > 1 && !$(this).attr("checked")) {
                                    $(this).click()
        
                                } else if (JSONval.indexOf("[checked]") > 1 == false && $(this).attr("checked")) {
        
                                    $(this).click()
                                }
                            } else if (JSONval.includes("/img/")) {
                                // console.log(`Img here skipping`)
                                // $(this).attr("type", "text")
                                // $(this).val(`${JSONval}`)

                            } else {
                                $(this).val(`${JSONval}`)
        
                            }
                        })
                    }
                }
            });
        }
        
        $("#bkp-upload-plugoo").change(function(event) {
            const file = event.target.files[0];
            if(file.name.endsWith(".zip")){
                var zip = new JSZip();
                const reader = new FileReader();
                // Leitura do arquivo ZIP e busca pelo arquivo JSON
                zip.loadAsync(file).then(function(zipContents) {
                    zipContents.forEach(function(relativePath, zipEntry) {
                        if (!zipEntry.dir && zipEntry.name.endsWith(".json")) {
                            zipEntry.async("blob").then(function(blob) {
                                reader.onload = function(e) {
                                    const jsonObject = JSON.parse(e.target.result);
                                    processJSON(jsonObject);
                                };
    
                                reader.readAsText(blob);
                                reader.onloadend = () => {
                                    backModeSave()
                                };
                            })
                            .catch(function(error) {
                                console.error('Erro ao ler o arquivo JSON:', error);
                            });
                        }
                    });
                })
                .catch(function(error) {
                    console.error('Erro ao carregar o arquivo ZIP:', error);
                });
            }
            else if (file){
                alert("Por favor carregue o arquivo de configuracoes do tema no formato .zip")
            }
        });
    }
    
    // downloadBkp()
    uploadBkp()
    
    }
    
    setTimeout(() => {
        if(window.location.href.includes("customizations")){
            loadFunctions()
        }
    }, 500);
    
    