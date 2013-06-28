$(function(){
    
    
    var $container = $('#container');
    
    // provide array with images to use
    // for now images should all be the same size
    var images = [{
        src: 'i/matt.jpg',
        width: 500,
        height: 500,
        name: 'matt'
    },
    {
        src: 'i/rob.jpg',
        width: 500,
        height: 500,
        name: 'rob'
    },
    {
        src: 'i/gavin.jpg',
        width: 500,
        height: 500,
        name: 'gavin'
    },
    {
        src: 'i/bueno.jpg',
        width: 500,
        height: 500,
        name: 'bueno'
    },
    {
        src: 'i/pickle.jpg',
        width: 500,
        height: 500,
        name: 'pickle'
    },
    {
        src: 'i/ty.jpg',
        width: 500,
        height: 500,
        name: 'ty'
    },
    {
        src: 'i/sean.jpg',
        width: 500,
        height: 500,
        name: 'sean'
    }];
    
    var allImages = [];
    
    
    var cubesWide = 10;
    var cubesHigh = 10;
    
    // loop thorough the images
    // create div element
    // add classname for filtering
    // add order for sorting
    $.each(images, function(idx, elem) {
        
        // debug
        console.log('processing imageObject #' + idx + ", " + elem.name);
        
        // size of cube
        var cubeWidth = elem.width / cubesWide;
        var cubeHeight = elem.height / cubesHigh;
        
        // get total cubes
        var totalCubes = cubesWide * cubesHigh;
        
        // offset variable to make y position work
        var currentYOffset = 0;
        
        
        // loop through each cube and set the bg position
        for(var i=0;i<totalCubes;i++) {
            
            // create the new div element
            // name and sort order are generated dynamically 
            var newDiv = $('<div class="object ' + elem.name + '" data-sort-order="' + i + '"></div>');

            // set the css
            newDiv.css({
                'backgroundImage': 'url(' + elem.src + ')', 
                'backgroundPositionX': i * cubeWidth * -1, 
                'backgroundPositionY' : currentYOffset,
                width: cubeWidth,
                height: cubeHeight
            });
            
            // if this is the last item in the row, lets incriment out y pos
            if((i+1) % cubesWide === 0) {
                console.log('last item in the row!');
                currentYOffset = currentYOffset - cubeHeight;
            }
            
            allImages.push(newDiv);
            //$('#container').append(robDiv);
            
        }
        
        
        // shuffle function
        // http://css-tricks.com/snippets/javascript/shuffle-array/
        function Shuffle(o) {
            for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };
        
        allImages = Shuffle(allImages);
        
        
        // add items to our container
        $.each(allImages, function(idx, elem) {
           $container.append(elem);
        });
        
        
        //var newImage = $('<img>').attr('src', elem);
        
    
        //$('body').prepend(newImage);
        
        //var newDiv = $('<div class="object matt" data-sort-number="'++'"></div>');
        
        
    });
    
    // set how many cubes we want
    // get image width
    // div width = image width / number of cubes
    
    // set bg image
    // calculate bg-position-x and bg-position-y based on
    
    
   
    
    $container.isotope({
        itemSelector: '.object',
        layoutMode: 'fitRows',
        resizable: false,
        getSortData : {
            order : function ( $elem ) {
                return parseInt($elem.attr('data-sort-order')); // @todo change to data attr
            }
        }
    });
    
    $('#button-filter button').click(function(){
        
        // whom are we showing?
        var selector = $(this).attr('data-filter');
        
        if (selector == '*') {
            $container.css({
                'max-width' : 1100
            });
        } else {
            $container.css({
                'max-width' : 500
            });
            
        }      
        
        // reinit isotope, with sort and show params
        $container.isotope({ 
            filter: selector,
            sortBy : 'order'
        });
        
        

        // prevent the default behavior of button click        
        return false;
    });
    
});








