#include<stdio.h>
#include<ctype.h>
int main(){
char size;
int extrasouce,extracheese;
float price;
printf(" *WELCOME TO REMORTELY PURCHASING* \n -RUCHELO'S WORLDWIDE PIZZA-\n ");
printf("Extracheese is (30 frw)\n");
printf("Extrasouce is (20 frw)\n");
printf("S-small is (100 frw)\n");
printf("M-medium is (130 frw)\n");
printf("L-large is (150 frw)\n");
printf("->please choose the size of PIZZA you need according to the information following (L,S,M):\n");
scanf("%c",&size);
size=tolower(size);
switch(size){
		case 's':
			price=100.0;
			printf("You have choosen small pizza!\n");
			printf("Would you like extracheese for 30 frw please?:\n");
	        printf("Press 1 for yes and 0 for no:\n");
	        scanf(" %d", &extracheese);
	        if(extracheese==1){
		        price+=30.0;
		        printf("Extracheese selected!\n");
	        }
	        else if(extracheese==0){
		        printf("No extracheese.:\n");
	        }
	        else{
		        printf("invalid response\n please restart the process");
		        return 1;
	        }
	        printf("Would you like extrasause for 20 frw please?:\n");
	        printf("Press 1 for yes and 0 for no!:\n");
	        scanf("%d", &extrasouce);
	        if(extrasouce==1){
		        price+=20.0;
		        printf("Extrasouce selected!:\n");
	        }
	        else if(extrasouce==0){
		        printf("No extrasouce.:\n");
	        }
	        else{
		        printf("invalid answer\n Please restart the process!");
		        return 1;
	        }
			break;
	    case 'm':
	    	price=130.0;
	    	printf("You have choosen medium pizza!\n");
	    	printf("Would you like extra cheese for 30 frw please?:\n");
	        printf("Press 1 for yes and 0 for no:\n");
	        scanf(" %d", &extracheese);
	        if(extracheese==1){
		        price+=30.0;
		        printf("Extracheese selected!\n");
	        }
	        else if(extracheese==0){
		        printf("No extracheese.:\n");
	        }
	        else{
		        printf("invalid response\n please restart the process");
		        return 1;
	        }
	        printf("Would you like extrasause for 30 frw please?:\n");
	        printf("Press 1 for yes and 0 for no!:\n");
	        scanf("%d", &extrasouce);
	        if(extrasouce==1){
		        price+=30.0;
		        printf("Extrasouce selected!:\n");
	        }
	        else if(extrasouce==0){
		        printf("No extrasouce.:\n");
	        }   
	        else{
		        printf("invalid answer\n Please restart the process!");
		        return 1;
	        }
	    	break;
	    case 'l':
	    	price=150.0;
	    	printf("You have choosen large pizza!\n");
	    	printf("Would you like extracheese for 30 frw please?:\n");
	        printf("press 1 for yes and 0 for no:\n");
	        scanf(" %d", &extracheese);
	        if(extracheese==1){
		        price+=30.0;
		        printf("Extracheese selected!\n");
	        }
	        else if(extracheese==0){
		        printf("No extracheese.:\n");
	        }
	        else{
		        printf("invalid response\n please restart the process");
		        return 1;
	        }
	        printf("Would you like extrasause for 20 frw please?:\n");
	        printf("Enter 1 for yes and 0 for no!:\n");
	        scanf("%d", &extrasouce);
	        if(extrasouce==1){
		        price+=20.0;
		        printf("Extra sauceselected!:\n");
	        }
	        else if(extrasouce==0){
		        printf("No extrasauce.:\n");
	        }
	        else{
		        printf("invalid answer\n Please restart the process!");
		        return 1;
	        }
	        break;
	    default:
	    	printf("Invalid choice\n Please try again by pressing (s/m/l):");
	    	return 1;
	}
	
	printf("_-*INVOICE DESCRIPTION*-_\n");
	printf("Pizza size: %c\n",size);
	printf("Produts bought:\n");
	if(extracheese==1 && extrasouce==1){
		printf("PIZZA, Extracheese and Extrasouce\n");
	}
	else if(extracheese==1 && extrasouce==0){
		printf("PIZZA and Extracheese\n");
	}
	else if(extracheese==0 && extrasouce==1){
		printf("PIZZA and Extrasouce\n");
	}
	else{
		printf("Only PIZZA\n");
	}
	printf("Total bill: %.1f Frw\n", price);
	printf("Thank you for glowing your trust with our royality\n See you soon\n");
	printf("Your satisfiations is our pressure by making best descount for many products ");
	return 0;
}
