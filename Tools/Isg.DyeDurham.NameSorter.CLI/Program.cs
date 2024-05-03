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
    /// <summary>
    /// These options are used for command line arguments.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// The main application starts here. Sample arguments are as follows:
        /// args: -i "unsorted-names-list.txt" -o "sorted-names-list.txt"
        /// </summary>
        /// <param name="args">The associated arguments used in the app.</param>
        public static void Main(string[] args)
        {
            Parser.Default.ParseArguments<Options>(args).WithParsed(Execute);
        }

        /// <summary>
        /// Executes the main pipeline of this console application.
        /// </summary>
        /// <param name="options">The options used to be executed on this application session.</param>
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

        /// <summary>
        /// Displays the header console information of this application.
        /// </summary>
        /// <param name="options">The options to be displayed.</param>
        private static void DisplayHeader(Options options)
        {
            Console.WriteLine("Displaying options...");
            Console.WriteLine($"\tInput file: {options.InputFilePath}");
            Console.WriteLine($"\tOutput file: {options.OutputFilePath}");
            Console.WriteLine();
        }

        /// <summary>
        /// Displays the results to the console.
        /// </summary>
        /// <param name="result">The results to be stored.</param>
        private static void DisplayResultsToConsole(NameSorterResult result)
        {
            Console.WriteLine();
            Console.WriteLine("Printing results...");
            Console.WriteLine(result);
            Console.WriteLine();
        }

        /// <summary>
        /// Saves the results to the designated file path.
        /// </summary>
        /// <param name="options">The options used to store the file path.</param>
        /// <param name="result">The results to be stored.</param>
        private static void SaveResultsToFile(Options options, NameSorterResult result)
        {
            Console.WriteLine("Generating file contents...");
            string fileResults = result.GenerateRaw();

            Console.WriteLine("Saving file contents...");
            File.WriteAllText(options.OutputFilePath, fileResults);
        }
    }
}
