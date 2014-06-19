(function(){

    Service = function(){};

    Service.prototype = {
        getMaps: function(url){

            var result = null;
            var url = url;

            $.ajax({
                url: url,
                type: 'get',
                async: false,
                success: function(data){
                    result = data;
                }
            });

            return result;
        },
    }
})();
