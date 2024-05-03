/*
 * Summary: These options are used for command line arguments.
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */

using CommandLine;

namespace Isg.DyeDurham.NameSorter.CLI.Models
{
    /// <summary>
    /// These options are used for command line arguments.
    /// </summary>
    public class Options
    {
        /// <summary>
        /// Determines the input file to be read.
        /// </summary>
        [Option('i', "input", Required = true, HelpText = "Input file path")]
        public string InputFilePath { get; set; }

        /// <summary>
        /// Determines the output directory file location.
        /// </summary>
        [Option('o', "output", Required = true, HelpText = "Output file path")]
        public string OutputFilePath { get; set; }
    }
}
