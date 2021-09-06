



class EgoPose
{
    constructor(sceneMeta, world, frameInfo)
    {
        this.world = world;
        this.data = this.world.data;
        this.sceneMeta = sceneMeta;
    }

    
    preload(on_preload_finished)
    {
        this.on_preload_finished = on_preload_finished;
        this.load_ego_pose();
    };

    
    load_ego_pose(){

        var xhr = new XMLHttpRequest();
        // we defined the xhr
        var _self = this;
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
        
            if (this.status == 200) {
                let egoPose = JSON.parse(this.responseText);
                _self.egoPose = egoPose;
            }
        
            _self.preloaded = true;

            if (this.on_preload_finished){
                this.on_preload_finished();
            }                
            if (this.go_cmd_received){
                this.go(this.webglScene, this.on_go_finished);
            }

            // end of state change: it can be after some time (async)
        };
        
        xhr.open('GET', "/load_ego_pose"+"?scene="+this.world.frameInfo.scene+"&frame="+this.world.frameInfo.frame, true);
        xhr.send();
    };


    loaded = false;
    go_cmd_received = false;
    on_go_finished = null;

    go(webglScene, on_go_finished)
    {
        this.loaded = true;
        if (this.preloaded){
            if (on_go_finished)
                on_go_finished();
        } else {
            this.go_cmd_received = true;
            this.on_go_finished = on_go_finished;
        }
    };




    unload()
    {
       
    };

}


export{EgoPose}