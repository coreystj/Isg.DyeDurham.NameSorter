/*
 * Summary: This command line application is used to sort names given input and output files.
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */

using CommandLine;

namespace Isg.DyeDurham.NameSorter.CLI.Models
{
    public class Options
    {
        [Option('i', "input", Required = true, HelpText = "Input file path")]
        public string InputFilePath { get; set; }

        [Option('o', "output", Required = true, HelpText = "Output file path")]
        public string OutputFilePath { get; set; }
    }
}
