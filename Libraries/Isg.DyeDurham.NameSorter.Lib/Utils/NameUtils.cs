/*
 * Summary: This utility class is used to manage names.
 * 
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */

using Isg.DyeDurham.NameSorter.Lib.Exceptions;
using Isg.DyeDurham.NameSorter.Lib.Models;
using System;
using System.Linq;

namespace Isg.DyeDurham.NameSorter.Lib.Utils
{
    /// <summary>
    /// This utility class is used to manage names.
    /// </summary>
    public static class NameUtils
    {
        /// <summary>
        /// converts a string to a named object.
        /// </summary>
        /// <param name="name">The name to be processed.</param>
        /// <returns>Returns the generated named object.</returns>
        /// <exception cref="NameProcessException">This exception is fired when processing the name had a processing error.</exception>
        public static Name Get(string name)
        {
            try
            {
                return new Name(name.Split(' ')
                    .Where(x => !string.IsNullOrEmpty(x)).ToArray());
            }
            catch (Exception ex)
            {

                throw new NameProcessException($"Failed to process name '{name}'.", ex);
            }
        }
    }
}
