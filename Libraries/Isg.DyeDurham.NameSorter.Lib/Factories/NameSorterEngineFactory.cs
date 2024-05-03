/*
 * Summary: This factory class is used to generate sorter engines.
 * 
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */


using Isg.DyeDurham.NameSorter.Lib.Engines;
using Isg.DyeDurham.NameSorter.Lib.Exceptions;
using Isg.DyeDurham.NameSorter.Lib.Utils;
using System.IO;
using System;

namespace Isg.DyeDurham.NameSorter.Lib.Factories
{
    /// <summary>
    /// This factory class is used to generate sorter engines.
    /// </summary>
    public static class NameSorterEngineFactory
    {
        /// <summary>
        /// Creates a sorter engine from file.
        /// </summary>
        /// <param name="filePath">The file path to create an engine from.</param>
        /// <returns>Returns the created sorting engine.</returns>
        /// <exception cref="FileNotFoundException">Thrown when the file was not found.</exception>
        /// <exception cref="ContentProcessException">Thrown when the file contents could not be processed.</exception>
        /// <exception cref="ContentsCannotBeNullOrEmptyExpcetion">Thrown when the file contents are null or empty.</exception>
        public static NameSorterEngine CreateFromFile(string filePath)
        {
            if (!File.Exists(filePath))
                throw new FileNotFoundException($"The file '{filePath}' does not exist.");
            
            if (FileContentUtils.CheckIsBinaryFile(filePath))
                throw new InvalidContentException();

            string rawContent = File.ReadAllText(filePath);
            return CreateFromRaw(rawContent);
        }

        /// <summary>
        /// Creates a sorter engine from raw content.
        /// </summary>
        /// <param name="rawContent">The raw content to be processed.</param>
        /// <returns>Returns the created sorting engine.</returns>
        /// <exception cref="ContentProcessException">Thrown when the file contents could not be processed.</exception>
        /// <exception cref="ContentsCannotBeNullOrEmptyExpcetion">Thrown when the file contents are null or empty.</exception>
        public static NameSorterEngine CreateFromRaw(string rawContent)
        {
            if (!string.IsNullOrEmpty(rawContent))
            {
                if (FileContentUtils.TryReadLines(rawContent, out string[] lines, out Exception? reason))
                {
                    return new NameSorterEngine(lines);
                }
                else
                {
                    throw new ContentProcessException(reason?.Message, reason);
                }
            }
            else
                throw new ContentsCannotBeNullOrEmptyExpcetion();
        }
    }
}
