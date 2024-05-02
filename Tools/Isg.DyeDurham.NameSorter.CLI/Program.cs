/*
 * Summary: This command line application is used to sort names given input and output files.
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */
using CommandLine;
using Isg.DyeDurham.NameSorter.CLI.Models;
using Isg.DyeDurham.NameSorter.Lib.Engines;
using Isg.DyeDurham.NameSorter.Lib.Factories;
using Isg.DyeDurham.NameSorter.Lib.Models;

namespace Isg.DyeDurham.NameSorter.CLI
{
    public class Program
    {
        // sample args: -i "unsorted-names-list.txt" -o "sorted-names-list.txt"
        public static void Main(string[] args)
        {
            Parser.Default.ParseArguments<Options>(args).WithParsed(Execute);
        }

        public static void Execute(Options options)
        {
            DisplayHeader(options);

            Console.WriteLine("Reading file contents...");
            NameSorterEngine engine = NameSorterEngineFactory.CreateFromFile(options.InputFilePath);

            Console.WriteLine("Sorting names...");
            NameSorterResult result = engine.Sort();

            DisplayResultsToConsole(result);

            SaveResultsToFile(options, result);

            Console.WriteLine("Done!");
        }

        private static void DisplayHeader(Options options)
        {
            Console.WriteLine("Displaying options...");
            Console.WriteLine($"\tInput file: {options.InputFilePath}");
            Console.WriteLine($"\tOutput file: {options.OutputFilePath}");
            Console.WriteLine();
        }

        private static void DisplayResultsToConsole(NameSorterResult result)
        {
            Console.WriteLine();
            Console.WriteLine("Printing results...");
            Console.WriteLine(result);
            Console.WriteLine();
        }

        private static void SaveResultsToFile(Options options, NameSorterResult result)
        {
            Console.WriteLine("Generating file contents...");
            string fileResults = result.GenerateRaw();

            Console.WriteLine("Saving file contents...");
            File.WriteAllText(options.OutputFilePath, fileResults);
        }
    }
}
