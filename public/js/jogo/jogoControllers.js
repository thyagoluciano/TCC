angular.module('tccApp.controllers', ['tccApp.services'])
    .controller('jogoCtrl', ['$scope', 'ajaxService', '$location', '$modal', function($scope, ajaxService, $location, $modal){

        $scope.avatar = {
            'name': '',
            'attributes': {'for': 0, 'agi': 0, 'vit': 0, 'int': 0, 'des': 0, 'sor': 0, 'total': 24},
            'user': ''
        };

        $scope.jogar = function(_id){
            ajaxService.setAvatar('/api/setAvatar/'+_id);
            location.href="/play";
        };

        $scope.logout = function(){
            ajaxService.getDataBy('/api/logout', function(){
                location.href="/";
            });
        };

        $scope.remover = function(_id){
            if(confirm("Deseja realmente excluir este avatar?")){
                var url = '/api/avatar/' + _id;
                console.log(url);
                ajaxService.delete(url, function(data){
                    location.href = '/jogo';
                });
            }
        };

        $scope.getUser = function(){
            var url = '/api/session';
            ajaxService.getDataBy(url, function(data){
                var _id = data._id;
                $scope.avatar.user = _id;

                if(_id === undefined){
                    location.href="/";
                }else{
                    ajaxService.getDataBy('/api/avatarbyuser/'+_id, function(data){
                        $scope.listAvatar = data;
                    });
                }
            });
        };


        $scope.open = function(){

            var modalInstance = $modal.open({
                templateUrl: 'angular/jogo/modal',
                controller: ModalInstanceCtrl,
                resolve: {
                    avatar: function(){
                        return $scope.avatar;
                    }
                }
            });

            modalInstance.result.then(function (avatar) {
                $scope.listAvatar.push(avatar);
            });
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance, avatar) {

            $scope.avatar = avatar;
            $scope.total = avatar.attributes.total;
            $scope.disabled = true;
            $scope.msg = 'Por Favor distribua';


            $scope.$watch('avatar.attributes.for', function(){
                $scope.total = $scope.avatar.attributes.total - $scope.avatar.attributes.for;
            });

            $scope.$watch('avatar.attributes.agi', function(){
                $scope.total = $scope.avatar.attributes.total - $scope.avatar.attributes.agi;
            });

            $scope.$watch('avatar.attributes.vit', function(){
                $scope.total = $scope.avatar.attributes.total - $scope.avatar.attributes.vit;
            });

            $scope.$watch('avatar.attributes.int', function(){
                $scope.total = $scope.avatar.attributes.total - $scope.avatar.attributes.int;
            });

            $scope.$watch('avatar.attributes.des', function(){
                $scope.total = $scope.avatar.attributes.total - $scope.avatar.attributes.des;
            });

            $scope.$watch('avatar.attributes.sor', function(){
                $scope.total = $scope.avatar.attributes.total - $scope.avatar.attributes.sor;
            });

            $scope.$watch('total', function(){
                $scope.total = ($scope.avatar.attributes.total - $scope.avatar.attributes.for - $scope.avatar.attributes.agi - $scope.avatar.attributes.vit - $scope.avatar.attributes.int - $scope.avatar.attributes.des - $scope.avatar.attributes.sor);

                if($scope.total == 0){

                    if($scope.avatar.name.length > 3){
                        $scope.disabled = false;
                    }

                    $scope.msg = 'Atributos do personagem OK';
                }else if($scope.total > 0){
                    $scope.msg = 'Por favor distribua: ';

                    $scope.disabled = true;
                }else{
                    $scope.msg = 'Por favor remova: ';
                    $scope.disabled = true;
                }
            });

            $scope.$watch('avatar.name', function(){
               if(avatar.name.length > 3 && $scope.total == 0){
                   $scope.disabled = false;
               }else{
                   $scope.disabled = true;
               }
            });

            $scope.ok = function () {
                $scope.avatar.attributes.total = $scope.total;

                ajaxService.postData('/api/avatar', $scope.avatar, function(data){
                    $modalInstance.close($scope.avatar);
                });
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

    }]);