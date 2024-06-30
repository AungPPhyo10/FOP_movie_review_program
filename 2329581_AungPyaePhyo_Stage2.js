// Name : Aung Pyae Phyo
// Class : DCITP/1A/03
// Adm : 2329581

console.log("Welcome to Silver Vintage Movie Review Program");

class Movie {    //Declare the class which consists of all 5 movie properties
    constructor(movieNames,movieGenre,movieRuntimes,movieRelease,movieRating) {
        this.movieNames=movieNames;
        this.movieGenre=movieGenre;
        this.movieRuntimes=movieRuntimes;
        this.movieRelease=movieRelease;
        this.movieRating=movieRating;
    }
    displayMovieDetails() {     //method to display all movie details
        console.log('Name \t \t : '+this.movieNames);
        console.log('Genre \t \t : '+this.movieGenre);
        console.log('Running Time \t : '+this.convertHrtoMin());
        console.log('Release Date \t : '+this.movieRelease);
        console.log('Rating \t \t : '+this.avgRating());
    }
    convertHrtoMin() {        //function inside the class to sort out the movie running times
        if (parseInt(this.movieRuntimes / 60) == 0) {   //if the movie is less than one hour
            return (this.movieRuntimes % 60)+'m';
        } else if (this.movieRuntimes % 60 == 0) {      //if the moive is exactly in hours without any minutes
            return Math.trunc(this.movieRuntimes / 60)+'h';
        } else {        //default display with hours and minutes
            return Math.trunc(this.movieRuntimes / 60)+'h '+(this.movieRuntimes % 60) +'m';
        }
    }
    avgRating() {       //Another function that will determine the average rating of movies based on "avg rating = (total votes/total users)""
        if (this.movieRating[0] == 0 || this.movieRating[1] == 0) {     //for the newly added movies which are not rated yet
            return (this.movieRating[0] +' ( '+this.movieRating[1]+' voters)');
        } else {return ((this.movieRating[1] / this.movieRating[0]).toFixed(1) +' (' +this.movieRating[0] +' voters) \n');}
    }
}

var Movie1=new Movie('Black Panther : Wakanda Forever 2022',['Adventure','Action', 'Drama', 'Fantasy', 'Sci-Fi', 'Thriller'],161,'11 Nov 2022',[9,42]);
var Movie2=new Movie('Avatar: The Way of Water',['Adventure', 'Sci-Fi'],192,'16 Dec 2022',[4,15]);
var Movie3=new Movie('Fast X',['Crime, Action', 'Mystery', 'Thriller'],43,'19 May 2023',[28,60]);
var Movie4=new Movie('Ant-Man and the Wasp: Quantumania',['Adventure', 'Action'],120,'16 Feb 2023',[18,80]);
var Movie5=new Movie('M3GAN',['Horror', 'Mystery', 'Thriller'],102,'6 Jan 2023',[20,70]);
var movieList=[Movie1,Movie2,Movie3,Movie4,Movie5];     //throw all the movies into a 2D array
var releaseDates=[Movie1.movieRelease,Movie2.movieRelease,Movie3.movieRelease,Movie4.movieRelease,Movie5.movieRelease];

var GenreOptions = ['Action', 'Adventure', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Sci-Fi', 'Thriller'];
function GenreDisplay() {      //function to display the genre options
    for (var y = 0; y < GenreOptions.length; y++) {
        console.log('\t ' + (y + 1) + ') ' + GenreOptions[y]);
    }
}


var input=require('readline-sync');

while (true) {
var name=input.question("Please enter your name:");
name=name.toString();
switch (name.length) {
    case (0) : console.log('To proceed, kindly enter your name \n');
    break;
    default : break;
    }
    if (name.length !== 0) {break;}     //to break out of the while loop
}

do {
    console.log("Hi "+name+", please select your choice:");
    console.log('\t 1. Display All Movies');
    console.log('\t 2. Add Movie');
    console.log('\t 3. Add Rating');
    console.log('\t 4. Latest 3 Release Date');
    console.log('\t 5. Filter by Genre');
    console.log('\t 6. Search by Movie Name');
    console.log('\t 7. Exit');

    var num=input.question('\t >>');
    if (isNaN(num) || num<1 || num>7 || num%1 != 0 || num.toString().length == 0) {    //output displayed if the user inputs choices other than 1 to 7 or empty value
        console.log('\t Please enter a valid input \n');
    }

    else if (num == 1) {
        for (var i = 0; i < movieList.length; i++) {       //the for loop will display movie details for each movie
            movieList[i].displayMovieDetails();
        }
    }


    else if (num == 2) {
    var MovieNameCheckBoolean = true; //create a boolean variable
    do {  
    var NextMovieName = input.question("\t Please enter the movie's name:");
    var LowerCaseNextMovieName = NextMovieName.toLowerCase();      //sets the user input movie name to lowercase

    if (!checkname(LowerCaseNextMovieName)) {     //inverts the boolean value obtained from the function
        console.log('\t Please enter a unique movie name.\n');      //movie name matches by function -> false -> inverted into true
    } else {        //movie name unique by function -> true -> inverted into false -> if part is skipped  
        MovieNameCheckBoolean = false;      //set the variable to false 
    }   
    } while (MovieNameCheckBoolean);        //use the variable in the loop condition to keep on looping or exit

    function checkname(inputMovieName) {    //function to check lowercase same movie name and returns a boolean value
        for (var x = 0; x < movieList.length; x++) {
            if (movieList[x].movieNames.toLowerCase() == inputMovieName) {    //sets the movie names in the array to lowercase and checks whether it's the same as user input
                return false;      //if the movie name matches, return false
            }
        }
        return true;    //if the movie name is unique, return true
    }

    var MovieGenreCheckBoolean = true;      //create a boolean variable
    do {
    console.log("\n \t Please enter Movie's genre(s):");
    GenreDisplay();

    var userGenres = input.question('\t >>');
    var userGenresSet = new Set(); // create a set to store only unique genre selections
    var genreChoices = userGenres.split(',');      //divide the numbers based on commas and make an array
    var validGenres = true;      //create another local boolean variable 

    for (var q = 0; q < genreChoices.length; q++) {
        var choice = genreChoices[q].trim();
    
        //check if the choice contains any invalid characters other than commas and digits
        if (! /^[0-9,]+$/.test(choice)) {
            console.log('\t Please enter valid genre option(s)!');
            validGenres = false;
            break;
        }
    
        //split the choices by commas and process each numeric choice according to their genre names
        var numericChoices = choice.split(',');
        for (var i = 0; i < numericChoices.length; i++) {
            var numericChoice = numericChoices[i];
    
            if (numericChoice >= 1 && numericChoice <= GenreOptions.length) {
                userGenresSet.add(GenreOptions[numericChoice - 1]);
            } else {
                console.log('\t Please enter valid genre option(s)!');
                validGenres = false;      //sets the validGenres boolean to false
                break;
            }
        }
    }
      
    if (validGenres) {      //if user input is valid, sets the outer boolean variable into false
        var userGenresArray = Array.from(userGenresSet);    //convert Set back to an array
        MovieGenreCheckBoolean = false;
    }
    } while (MovieGenreCheckBoolean);


    var NextMovieRelease=input.question("\n \t Please enter Movie's release date:")     //assuming user always input correct format


    var MovieRuntimeCheckBoolean=true;      //create a boolean variable
    do {
    var NextMovieRuntime=input.question("\n \t Please enter Movie's running time (mins):")
    if (isNaN(NextMovieRuntime) || NextMovieRuntime%1 != 0) {       //if user input is not a number, denies and loops again
        console.log('\t Please enter valid running time!')
    } else {
        MovieRuntimeCheckBoolean=false;     //if user input is correct, set the variable to false
        console.log();
    }    
    } while (MovieRuntimeCheckBoolean);     //use the variable in the loop condition to keep on looping or exit


    //add all the user inputs into a new object by using the class
    var addedMovie=new Movie(NextMovieName,userGenresArray,NextMovieRuntime,NextMovieRelease,[0,0]);
    movieList.push(addedMovie);     //push the newly added movie into the existing movieList array
    releaseDates.push(NextMovieRelease);
    }

    
    else if (num == 3) {
        var MovieRatingCheckBoolean = true;     //create a new boolean variable for the loop
        do {
            console.log('\t Select the movie to add a rating:');
            var p = 0;
            for (p; p < movieList.length; p++) {
                console.log('\t ' + (p + 1) + ') ' + movieList[p].movieNames);
            }
            console.log('\t ' + (p + 1) + ') Go Back to Main Menu');
            var chooseMovietoRate = input.question('\t >>');
            if (isNaN(chooseMovietoRate) || chooseMovietoRate %1 != 0 || chooseMovietoRate>movieList.length+1 ) {
                console.log('\n \t Kindly enter a valid input! \n');
            }
            else if (parseInt(chooseMovietoRate) == movieList.length+1) {      //when the user chooses the exiting number
                MovieRatingCheckBoolean = false;          //sets the outer boolean variable to false
            }
            else if (parseInt(chooseMovietoRate)) {
                var RatingMoviesBoolean=true;       //create local boolean variable for the while loop
                while (RatingMoviesBoolean) {                               
                var addNewRating=input.question('\t Enter your rating for "'+movieList[chooseMovietoRate-1].movieNames+'" ( 1 to 5 inclusive):');
                
                if (isNaN(addNewRating) || addNewRating %1 !=0 || addNewRating<1 || addNewRating >5) {
                    console.log('\n \t Enter a valid rating! \n'); 
                }
                else {     
                    movieList[chooseMovietoRate-1].movieRating[1] += parseInt(addNewRating);    //adds the new rating into the existing rating
                    ++movieList[chooseMovietoRate-1].movieRating[0];    //increment the total user number
                    RatingMoviesBoolean=false; }       //sets the local boolean variable to false to exit the rating validation loop
                }
            }
        } while (MovieRatingCheckBoolean);
    }

    
    else if (num == 4) {    
        var dateObjects = releaseDates.map(function(dateString,index) {   //convert strings to Date objects in another array with map function
            return  {
                NameofMovies:movieList[index].movieNames,       //name of movie stored in corresponding index
                date: new Date(dateString) };       //dateStrings are changed into date objects for sorting
        });

        dateObjects.sort(function(a, b) {     // sort the dateObjects array in descending order
            return b.date - a.date;
        });

        var latestThreeDates = dateObjects.slice(0, 3);     //extract the first three elements which are latest 3 movies
        console.log('\t The latest three movies are:');
        latestThreeDates.forEach(function (movie, index) {      //runs a function for each of the array element by sorting 
        var day = movie.date.getDate();         //extracts the date 
        var month = movie.date.toLocaleString('default', { month: 'short' });       //changes the time format into localeTimeString
        var year = movie.date.getFullYear();        //extracts the four-digit-year
        console.log('\t '+(index+1)+') '+day+' '+month+' '+year+' - '+movie.NameofMovies);
        });
    }


    else if (num == 5) {
        var FilteringGenresBoolean = true;
        while (FilteringGenresBoolean) {
          console.log('\t Please select a genre:');
          GenreDisplay();
          var genreFilter = input.question('\t >>');

            if (isNaN(genreFilter) || genreFilter < 1 || genreFilter > GenreOptions.length || genreFilter % 1 != 0) {
            console.log('\t Please enter a valid genre input! \n');
            } else {
            var FilteredMovie = GenreOptions[genreFilter - 1];
            console.log('\t You have chosen "' + FilteredMovie + '" genre:');
            var FilteredMoviesArray = movieList.filter(movie => movie.movieGenre.includes(FilteredMovie));
            //filters and returns the movie names which include the user input movie names into an array
      
            if (FilteredMoviesArray.length == 0) {
              console.log('\t No movies found for the selected genre.');
            } else {
              FilteredMoviesArray.forEach((movie, index) => {       //process each element in the FilteredMoviesArray with the function
                console.log('\t ' + (index + 1) + ') ' + movie.movieNames);     
              });
            }
            FilteringGenresBoolean = false;
          }
        }
    } 

    //Advanced Feature (Search by movie name)
    else if (num == 6) {
        var UserSearch=input.question('\t Please type in the movie name that you want to search :');
        searchMoviesByKeyword(UserSearch);
        
        function searchMoviesByKeyword(keyword) {
            var lowercaseKeyword = keyword.toLowerCase();       //first change the user's keywords into lowercase

            //filter the movieList to find movies whose names include the lowercase keyword
            var foundMovies = movieList.filter(movie => {
            var lowercaseMovieName = movie.movieNames.toLowerCase();      //change each movie name into lowercase 
            return lowercaseMovieName.includes(lowercaseKeyword);       //check if the movie name includes the user's lowercase keywords
            });
        
            if (foundMovies.length > 0) {
                console.log("\t Matching Movies:");
                foundMovies.forEach((movie,index) => {
                console.log('\t '+(index+1)+') '+movie.movieNames);});
                console.log("\t If you wish to find out more about these movies, please proceed to display all movies.")
            } else {
                console.log("\t No results found. \n");
            }
        }
    }
      
} while (num != 7);   //loops infinitely unless the choice is 6
console.log('Thank you & goodbye!');    //program terminates

