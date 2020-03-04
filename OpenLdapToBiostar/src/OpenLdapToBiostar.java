import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

public class OpenLdapToBiostar {
    
    //static final String ORIGIN = "C:\\Users\\alfre\\Documents\\PRG\\DevscolaHomework\\OpenLdapToBiostar\\src\\ldap-UID.txt";
    //static final String DESTINATION = "C:\\Users\\alfre\\Documents\\PRG\\DevscolaHomework\\OpenLdapToBiostar\\src\\UsersToImportIntoBiostar2.csv";
    static final String ORIGIN = "ldap-UID.txt";
    static final String DESTINATION = "UsersToImportIntoBiostar2.csv";
    static final String STATICCHAIN = ",201,,All Users,2020-01-01 00:00:00,2030-12-31 23:59:00,,00000000A,M"+"\n";
    static final String FIRSTLINE = "user_id,name,phone,email,user_group,start_datetime,expiry_datetime,csn,DNI,Sexo"+"\n";
    static final String ENDCHAIN = ",";
       
    
    public static String addText (String linea){
        
        linea = (linea+ STATICCHAIN);
        return linea;
    }
    
    
    //Dada una cadena donde buscar, una posición de la misma y otra cadena a buscar,
    //devuelve la posicion donde aparece por primera vez la cadena buscada desde la posición inicial dada. En caso de no encontrarla devuelve 0
     public static int positionOfSearchChain (String chain, int initialPosition, String chainToSearch){
         int lengthOfChainToSearch = chainToSearch.length();
         char buf[] = new char[lengthOfChainToSearch];
         String bufString;
         int positionOfChainToSearch = 0- lengthOfChainToSearch;
            for (int actualPosition = initialPosition; actualPosition< (chain.length()-lengthOfChainToSearch); ++actualPosition) {
                   chain.getChars(actualPosition, (actualPosition+lengthOfChainToSearch), buf, 0);
                   bufString=String.valueOf(buf);  
                   if (bufString.equals(chainToSearch)) {
                       positionOfChainToSearch = actualPosition;
                   }
         }
         return positionOfChainToSearch+lengthOfChainToSearch;
     }
    
    
    
    //Given a string, it extracts the text between the given position and the character entered.
    public static String extractChain (String chain, int initialPosition, String endChain){
        
        int lengthExtractedChain;
        char[] bufEndChain = new char[1];
        char[] bufSearchChain = new char[1];
        String bufEndChainString;
        StringBuilder extractedChain =new StringBuilder("");  
        String extractedChainString = "";
        int actualPosition = initialPosition;
        if (initialPosition != 0){
            do {
                lengthExtractedChain= extractedChain.length();
                chain.getChars(actualPosition, (actualPosition+1), bufSearchChain, 0);
                extractedChain.insert(lengthExtractedChain, bufSearchChain);
                chain.getChars(actualPosition, (actualPosition+1), bufEndChain, 0);
                bufEndChainString =String.valueOf(bufEndChain);
                actualPosition=actualPosition+1;
            } while ((!(bufEndChainString.equals(endChain))) && (actualPosition < (chain.length())));
        }
        lengthExtractedChain= extractedChain.length();
        extractedChainString = (extractedChain.toString());
        if ((initialPosition != (chain.length())) && (actualPosition != 0) ){
            extractedChainString = extractedChainString.substring(0,lengthExtractedChain);
        }else {
            extractedChainString ="";
        }
        return extractedChainString;
    }
    
    
    public static void main(String[] args) throws FileNotFoundException, IOException  {
        String bufTest;
        String chain;
        int storePositionOfSearchChain;
        //String ENDCHAIN = ",";
        String firstWord = null;
        String secondWord = null;
        
        
        // Parametros de lectura
        FileReader f = new FileReader(ORIGIN);
        BufferedWriter bw;
        // Parametros de escritura
        try (BufferedReader b = new BufferedReader(f)) {
            // Parametros de escritura
            File newArchivo = new File(DESTINATION);
            bw = new BufferedWriter(new FileWriter(newArchivo));
            bw.write(FIRSTLINE);
            //First loop that separates the source file by lines
            while ((chain = b.readLine())!=null) {
                bufTest = "uid: ";
                storePositionOfSearchChain = positionOfSearchChain (chain, 0,bufTest);
                if (!(storePositionOfSearchChain == 0)){
                    firstWord = (extractChain (chain,storePositionOfSearchChain,ENDCHAIN));
                } else {
                    bufTest = "gecos: ";
                    storePositionOfSearchChain = positionOfSearchChain (chain, 0,bufTest);
                    secondWord = (extractChain (chain,storePositionOfSearchChain,ENDCHAIN));
                    bw.write(addText (firstWord + "," + secondWord));
                    System.out.println(addText(firstWord + "," +secondWord));
                }
            }
            // Close file read
        }
        // Close file write
        bw.close();
    }
}
