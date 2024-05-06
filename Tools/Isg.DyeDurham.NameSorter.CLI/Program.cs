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
using System.Reflection;

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
            DisplayTitle();
            DisplaySoftwareDetails();
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
        /// Displays the title of this application.
        /// </summary>
        private static void DisplayTitle()
        {
            Console.WriteLine(
                "\r\n  _   _                         _____            _            " +
                "\r\n | \\ | |                       / ____|          | |           " +
                "\r\n |  \\| | __ _ _ __ ___   ___  | (___   ___  _ __| |_ ___ _ __ " +
                "\r\n | . ` |/ _` | '_ ` _ \\ / _ \\  \\___ \\ / _ \\| '__| __/ _ \\ '__|" +
                "\r\n | |\\  | (_| | | | | | |  __/  ____) | (_) | |  | ||  __/ |   " +
                "\r\n |_| \\_|\\__,_|_| |_| |_|\\___| |_____/ \\___/|_|   \\__\\___|_|   " +
                "\r\n"
                );
        }

        private static void DisplaySoftwareDetails()
        {
            Console.WriteLine("Title: " + "Name Sorter CLI");
            Console.WriteLine("Description: " + "Sorts your names with ease.");
            Console.WriteLine("Author: " + "Corey St-Jacques");

            Assembly assembly = Assembly.GetExecutingAssembly();
            Version version = assembly.GetName().Version;
            Console.WriteLine("Version: " + version.ToString());
            Console.WriteLine();
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
            Console.WriteLine();
            Console.WriteLine(result);
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
