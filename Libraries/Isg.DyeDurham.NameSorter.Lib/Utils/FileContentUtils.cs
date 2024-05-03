/*
 * Summary: This utility class is used to manage file content.
 * 
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */

using Isg.DyeDurham.NameSorter.Lib.DataTypes;
using System;
using System.IO;

namespace Isg.DyeDurham.NameSorter.Lib.Utils
{
    /// <summary>
    /// This utility class is used to manage file content.
    /// </summary>
    public static class FileContentUtils
    {
        /// <summary>
        /// Attempts to read lines from a raw content set of lines.
        /// </summary>
        /// <param name="rawContent">The raw content to be read.</param>
        /// <param name="lines">The resulting lines are outputted here.</param>
        /// <param name="resonException">The reason expcetion output is passed here if an error occurs.</param>
        /// <returns>Returns true if reading lines were successful.</returns>
        public static bool TryReadLines(string rawContent, 
            out string[] lines, out Exception? resonException)
        {
			try
			{
                resonException = null;
                lines = rawContent.Split(
                    new[] { Constants.RETURN_STANDARD, "\n" }, 
                    StringSplitOptions.RemoveEmptyEntries);
                return lines != null;
            }
			catch (Exception ex)
			{
                resonException = ex;
                lines = new string[0];
                return false;
			}
        }

        /// <summary>
        /// Determines whether the rawContent is a binary file content.
        /// </summary>
        /// <param name="filePath">The file path to be checked.</param>
        /// <returns>Returns true if the contents are binary.</returns>
        public static bool CheckIsBinaryFile(string filePath)
        {
            using FileStream fileStream = File.OpenRead(filePath);
            byte[] buffer = new byte[1024];

            int bytesRead = fileStream.Read(buffer, 0, buffer.Length);

            for (int i = 0; i < bytesRead; i++)
            {
                byte currentByte = buffer[i];

                if ((currentByte < 32 || currentByte > 126)
                    && currentByte != 9 && currentByte != 10 && currentByte != 13)
                {
                    return true;
                }
            }

            return false;
        }
    }
}
