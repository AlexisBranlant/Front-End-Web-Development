var object = {};//remplacer le nopm de l object par le nom du projet
!function($){
	object.debug = false; // affichage des outils de debug si true
	
	//fonction qui permet l'affichage de la grille
	object.grid = function(){
		var gridButton = document.createElement('a');
		gridButton.className = "show-grid";
		gridButton.innerHTML = "GridSystem";
		document.body.appendChild(gridButton);
		$('body').on('click','.show-grid',function(){
			if(!$(this).hasClass('active')){
				$(this).addClass('active');
				var gridSystem = document.createElement('div');
				gridSystem.className = "grid-system";
				document.body.appendChild(gridSystem);
			} else {
				$(this).removeClass('active');
				$('.grid-system').remove();
			}
		});
	}
	//fonction de calcul de d'execution d'une fonction
	var Speed = true;
	object.speedTrace = function(mode, string){
		if(object.debug){
			if(Speed == undefined){
				Speed = new Array();
				Speed['DIV'] = document.createElement('div');
				$(Speed['DIV']).css({'position':'absolute','top':'10px','left':'10px',font:'10px Arial'});
				$('body').append(Speed['DIV']);
			}
			switch(mode){
				case 'start':
					Speed[string] = new Date().getTime();
					break;
				case 'stop':
					Speed[string] = (new Date().getTime() - Speed[string]);
					$(Speed['DIV']).html( $(Speed['DIV']).html() + '<br/>' + string + ' :: '+Speed[string]+'ms')
					break;
			}
		}
	}

    object.mainNav = function(){
        $(document.getElementById('open-main-nav')).on('click',function(event){
            if($('html').hasClass('lt-ie9')){
                event.stopPropagation();
                event.preventDefault();
                $(document.getElementById('main-nav')).toggleClass('open');
                $(document.getElementById('overlay')).toogleClass('open');
            } else {
                $(document.getElementById('overlay')).addClass('open');
            }
        });
        if(!$('html').hasClass('lt-ie9')){
            $(document.getElementById('close-main-nav')).on('click',function(event){
                $(document.getElementById('overlay')).removeClass('open');
            });
        }
        $(document.getElementById('overlay')).on('click',function(event){
            event.stopPropagation();
            event.preventDefault();
            $(document.getElementById('main-nav')).toggleClass('open');
            $(document.getElementById('overlay')).toggleClass('open');
        });
        $(document.getElementById('overlay')).height($(document.getElementsByTagName('window')).height());
    }
    $(function(){//document ready
		if(object.debug){
			object.grid();
		}
        object.mainNav();
    })
}(window.jQuery)