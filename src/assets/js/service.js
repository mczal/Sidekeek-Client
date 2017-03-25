var appServices = angular.module('app.service', ['ui.bootstrap']);

// array of month
var arrOfMonth = [];
arrOfMonth['Jan']='01';
arrOfMonth['Feb']='02';
arrOfMonth['Mar']='03';
arrOfMonth['Apr']='04';
arrOfMonth['May']='05';
arrOfMonth['Jun']='06';
arrOfMonth['Jul']='07';
arrOfMonth['Aug']='08';
arrOfMonth['Sep']='09';
arrOfMonth['Oct']='10';
arrOfMonth['Nov']='11';
arrOfMonth['Des']='12';

function curDate(){
    var cur = new Date();
    var temp = cur +" ";
    var temp2 = temp.split(" ");
    return temp2[3]+"-"+temp2[2]+"-"+arrOfMonth[temp2[1]]+" "+temp2[4];
}

const credentials = {
  url : "http://103.236.201.92:3000/sideAPIkeek",
  token : "",
  tempSearch: null
}

appServices.factory('generalSerivce',function(){
  return{
    generateUniqueCode: function(){
       var text = "";
       var possible = "[&900qnw@ml;kNI./UBI~`189`aklm3076IAKU-PASTI-BISA';l";

       for( var i=0; i < 10; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
       }
       return text;
    }

  }
});

appServices.factory('registerService',function(){
  var registerData;
  return{
    saveRegisterData: function(data){
      return registerData = data;
    },
    getRegisterData: function(){
      return registerData;
    },
    clearRegisterData: function(){
      return registerData = null;
    }
  }
});

appServices.factory('authService',function($http){
  return{
    getToken : function(){
      return $http({
          method: 'POST',
          url: credentials.url + '/auth',
          headers: {
             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
    },
    getUserToken : function(eAuth,pAuth){
      return $http({
        method:'POST',
        url: credentials.url + '/auth',
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data:{
          'emailAuth':eAuth,
          'passwordAuth':pAuth
        }
      })
    },
    setToken: function(token){
      return credentials.token = token;
    },
     generateSession: function(){
       var text = "";
       var possible = "[&900qnw@ml;kNI./UBI~`189`aklm3076IAKU-PASTI-BISA';l";

       for( var i=0; i < 10; i++ )
           text += possible.charAt(Math.floor(Math.random() * possible.length));

       return text;
    }
  }
});

appServices.factory('searchService',
function($http){
  return{
    searchTemplate : function(searchData){
      // console.log(searchData);
      // console.log(searchData.query);
      return $http({
        method : 'GET',
        url: credentials.url + '/search-template',
        headers:{
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        params:{
          // info:null,
          query:searchData.query,
          // keywords:{
          //   "category":[searchData.category],
          //   "location":[searchData.location],
          //   "tipe":[searchData.tipe]
          // },
          size:10,
          page:1
        }
      })
    },

    setTempSearch : function(tempSearch){
      return credentials.tempSearch = tempSearch;
    },

    getTempSearch : function(){
      return credentials.tempSearch;
    }
  }
});

appServices.factory('summaryService',
  function($http){
    return{
      getCategories : function(){
        return $http({
            method: 'GET',
            url: credentials.url + '/getCategories',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: credentials.token
            })
        })
      },

      isHost :function(){
        return $http({
            method: 'POST',
            url: credentials.url + '/isHost',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: credentials.token,
                email: localStorage.getItem('emailHost')
            })
        })
      },

      getCities : function(){
        return $http({
            method: 'GET',
            url: credentials.url + '/getCities',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: credentials.token
            })
        })
      },

      getProvince: function(){
        return $http({
            method: 'GET',
            url: credentials.url + '/getProvince',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: credentials.token
            })
        })
      }
    }

});

appServices.factory('uiService',
  function($uibModal){
    return{
      showModal: function(url){
        let modalInstance = $uibModal.open({
          animation: true,
          templateUrl: url
        });
      }
    }
});

appServices.factory('userService',
	function(authService,$http){
		return{
      signup : function(email,pass,confirm){
        return  $http({
            method: 'POST',
            url: credentials.url + '/sign-up',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: credentials.token,
                statTemp: localStorage.getItem('statTemp'),
                email: email,
                password: pass,
                confirmation: confirm
            })
        })
      },

      hostSignup : function(regData){
        return  $http({
            method: 'POST',
            url: credentials.url + '/hostSignUp',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: credentials.token,
                idTipe: regData.idTemp,
                idCat: regData.categories,
                compName: regData.company,
                threadTitle: regData.thread,
                email: regData.email,
                password: regData.password,
                confirmation: regData.confirm
            })
        })
      },

			logout: function(){
				// var token;
				return $http({
            method: 'POST',
            url: credentials.url + '/logout',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: credentials.token,
                sessionCode: localStorage.getItem('session')
            })
        })
			},

      login : function(email,pass){
        return $http({
          method : 'POST',
          url: credentials.url + '/login',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: $.param({
              token: credentials.token,
              email: email,
              password: pass,
              timestamp: curDate()
          })
        })
      },
      integrityCheck: function(){
        return $http({
            method: 'POST',
            url: credentials.url + '/integrityCheck',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: credentials.token,
                sessionCode: localStorage.getItem('session')
            })
        })
      },

      confirmAccount: function(uq){
        return $http({
            method: 'POST',
            url: credentials.url + '/confirmation',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: credentials.token,
                uniqueCode: uq
            })
        })
      },

      getAccount : function(idHost){
        // console.log(credentials.token);
        return $http({
            method: 'GET',
            url: credentials.url + '/getAccount/'+ idHost,
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : credentials.token,
                email : localStorage.getItem('emailHost')
            })
        })
      },

      editAccount : function(accountData){
        return $http({
            method: 'POST',
            url: credentials.url + '/editAccount',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: credentials.token,
                sessionCode: localStorage.getItem('session'),
                companyName: accountData.companyName,
                // imgbase64: accountData.imageBase64,
                about: accountData.about,
                handphone: accountData.handphone,
                city: accountData.city,
                address: accountData.address
            })
        })
      },

      editAccountPic : function(img){
        return $http({
            method: 'POST',
            url: credentials.url + '/editAccountPic',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: credentials.token,
                sessionCode: localStorage.getItem('session'),
                imgbase64: img
            })
        })
      },

      getProfile : function(idHost){
        // let idHost = localStorage.getItem('idHost');
        //// console.log("idHost = " + idHost);
        return $http({
            method: 'GET',
            url: credentials.url + '/getProfile/' + idHost,
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : credentials.token
            })
        })
      },

      editProfile : function(newData){
        return $http({
            method: 'POST',
            url: credentials.url + '/editProfile',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : credentials.token,
                sessionCode : localStorage.getItem("session"),
                title : newData.title,
                businessCategory : newData.category,
                companyDesc : newData.desc,
                tipe: newData.tipe
            })
        })
      },

      editProductDesc: function(productData){
        return $http({
            method: 'POST',
            url: credentials.url + '/editProductDesc',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : credentials.token,
                sessionCode : localStorage.getItem("session"),
                idProduct : productData.idProduct,
                namaProduk : productData.namaProduk,
                harga : productData.harga,
                productDesc : productData.productDesc,
                timestamp : curDate()
            })
        })
      },

      // getProducts: function(){
      //   return $http({
      //       method: 'GET',
      //       url: credentials.url + '/getProducts',
      //       headers: {
      //          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      //       },
      //       params:{
      //           token : credentials.token,
      //           email : localStorage.getItem('emailHost')
      //       }
      //   })
      // },

      getProductsEager: function(size, page){
        let idHost = localStorage.getItem('idHost');
        return $http({
            method: 'GET',
            url: credentials.url + '/getProductsEager/' + idHost + '?size='+ size +'&page=' + page,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token: credentials.token,
                sessionCode: localStorage.getItem('session'),
            })
        })
      },

      getPortofolios: function(idHost){
        //let idHost = localStorage.getItem('idHost');
        return $http({
            method: 'GET',
            url: credentials.url + '/getPortofolios/' + idHost,
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : credentials.token,
                email : localStorage.getItem('emailHost')
            })
        })
      },

      getPortofolioDetail: function(idPortofolio){
        return $http({
            method: 'GET',
            url: credentials.url + '/getPortofolioDetail/' + idPortofolio,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
      },

      addNewPortofolio: function(portfolioData){
        return $http({
            method: 'POST',
            url: credentials.url + '/addNewPortofolio',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : credentials.token,
                sessionCode : localStorage.getItem('session'),
                title : portfolioData.title,
                description : portfolioData.desc,
                timestamp : curDate(),
                imgbase64 : portfolioData.imageBase64
            })
        })

      },

      editPortofolio: function(newData){
        return $http({
            method: 'POST',
            url: credentials.url + '/editPortofolio',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : credentials.token,
                sessionCode : localStorage.getItem("session"),
                idPortofolio : newData.id,
                title : newData.title,
                description : newData.desc
            })
        })
      },

      editPortofolioImg: function(imageData){
        return $http({
            method: 'POST',
            url: credentials.url + '/editPortofolioImg',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : token,
                sessionCode : localStorage.getItem("session"),
                idPortofolio : imageData.id,
                imagebase64 : imageData.source
            })
        })
      },

      addNewProductDesc: function(productData){
        return $http({
            method: 'POST',
            url: credentials.url + '/addNewProductDesc',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : credentials.token,
                sessionCode : localStorage.getItem('session'),
                namaProduk : productData.name,
                harga : productData.price,
                productDesc : productData.desc,
                timestamp : curDate()
            })
        })
      },

      addProductImage: function(imageData){
        return $http({
            method: 'POST',
            url: credentials.url + '/addProductImage',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : credentials.token,
                sessionCode : localStorage.getItem('session'),
                idProduct : imageData.id,
                imgbase64 : imageData.source
            })
        })
      },

      addHostReview: function(reviewData){
        return $http({
            method: 'POST',
            url: credentials.url + '/addHostReview',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
                token : credentials.token,
                sessionCode : localStorage.getItem('session'),
                score : reviewData.score,
                idHost : reviewData.idHost,
                comment: reviewData.comment,
                name: reviewData.name
            })
        })
      },

      getHostReview: function(id){
        return $http({
            method: 'GET',
            url: credentials.url + '/getHostReview/' + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
      }
		}
});
